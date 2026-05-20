import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { getAppConfig, getAppConfigNumber } from "@/lib/app-config";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes('xxx') || apiKey.includes('placeholder')) {
    console.error("RESEND_API_KEY nu este configurat corect");
    return null;
  }
  return new Resend(apiKey);
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const applicationSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere").max(100),
  email: z.string().email("Adresa de email nu este validă"),
  phone: z.string().min(6).max(20).optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  sales: z.string().min(1, "Completează vânzările lunare"),
  budget: z.string().min(1, "Completează bugetul de reclame"),
  message: z.string().max(2000).optional(),
  honeypot: z.literal("").optional(),
});

const ipRequests = new Map<string, number[]>();

async function getRateLimitConfig() {
  const window = await getAppConfigNumber("rate_limit_window_ms", 60 * 60 * 1000);
  const max = await getAppConfigNumber("rate_limit_max", 5);
  return { window, max };
}

async function isRateLimited(ip: string): Promise<boolean> {
  const { window, max } = await getRateLimitConfig();
  const now = Date.now();
  const requests = ipRequests.get(ip) || [];
  const recentRequests = requests.filter((time) => now - time < window);

  if (recentRequests.length >= max) {
    return true;
  }

  recentRequests.push(now);
  ipRequests.set(ip, recentRequests);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Prea multe cereri. Încearcă mai târziu." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const result = applicationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Date invalide", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 1. Salvează în Supabase (dacă e configurat)
    let dbSaved = false;
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { error: dbError } = await supabase.from("applications").insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          website: data.website || null,
          monthly_sales: data.sales,
          ad_budget: data.budget,
          message: data.message || null,
          ip_address: ip,
          source: "website",
          status: "new",
        });
        
        if (dbError) {
          console.error("Supabase insert error:", dbError);
          return NextResponse.json(
            { error: "Eroare la salvarea datelor: " + dbError.message },
            { status: 500 }
          );
        }
        dbSaved = true;
      }
    } catch (dbError: any) {
      console.error("Supabase save failed:", dbError);
      return NextResponse.json(
        { error: "Eroare la salvarea datelor. Încearcă mai târziu." },
        { status: 500 }
      );
    }

    // 2. Trimite email via Resend (nu blocăm submit-ul dacă emailul eșuează)
    try {
      const resend = getResend();
      if (resend) {
        const fromEmail = await getAppConfig("email_from") || "High-Up Labs <noreply@highuplabs.ro>";
        const toEmail = await getAppConfig("email_to") || "business@highuplabs.ro";
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: `Aplicație nouă: ${data.name}`,
          html: `
            <h2>Aplicație nouă primită</h2>
            <p><strong>Nume:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone || "N/A"}</p>
            <p><strong>Website:</strong> ${data.website || "N/A"}</p>
            <p><strong>Vânzări lunare:</strong> ${data.sales}</p>
            <p><strong>Buget reclame:</strong> ${data.budget}</p>
            <p><strong>Mesaj:</strong> ${data.message || "N/A"}</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Nu returnăm 500 - aplicația a fost salvată în DB
    }

    console.log("Application received:", {
      ...data,
      ip,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Eroare internă. Încearcă mai târziu." },
      { status: 500 }
    );
  }
}
