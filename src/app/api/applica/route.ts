import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { getAppConfig, getAppConfigNumber } from "@/lib/app-config";
import { applicationSchema } from "@/lib/schemas/application";
import fs from "fs";
import path from "path";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes('xxx') || apiKey.includes('placeholder')) {
    console.warn("RESEND_API_KEY nu este configurat corect — email-urile nu se vor trimite");
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

const RATE_LIMIT_FILE = path.join("/tmp", "rate-limit-applica.json");

interface RateLimitEntry {
  timestamps: number[];
}

function loadRateLimitData(): Record<string, RateLimitEntry> {
  try {
    if (fs.existsSync(RATE_LIMIT_FILE)) {
      const raw = fs.readFileSync(RATE_LIMIT_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // corrupted or unreadable — start fresh
  }
  return {};
}

function saveRateLimitData(data: Record<string, RateLimitEntry>): void {
  try {
    fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(data), "utf-8");
  } catch {
    // /tmp full or read-only — degrade gracefully
  }
}

async function getRateLimitConfig() {
  const windowMs = await getAppConfigNumber("rate_limit_window_ms", 60 * 60 * 1000);
  const max = await getAppConfigNumber("rate_limit_max", 5);
  return { windowMs, max };
}

async function isRateLimited(ip: string): Promise<boolean> {
  const { windowMs, max } = await getRateLimitConfig();
  const now = Date.now();
  const data = loadRateLimitData();

  const entry = data[ip] || { timestamps: [] };
  const recent = entry.timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    return true;
  }

  recent.push(now);
  data[ip] = { timestamps: recent };
  saveRateLimitData(data);
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
    } catch (dbError) {
      console.error("Supabase save failed:", dbError);
      return NextResponse.json(
        { error: "Eroare la salvarea datelor. Încearcă mai târziu." },
        { status: 500 }
      );
    }

    // 2. Trimite email via Resend DOAR dacă s-a salvat în DB
    if (dbSaved) {
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
        } else {
          console.warn("Email not sent — RESEND_API_KEY missing. Set it in Vercel Dashboard.");
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Eroare internă. Încearcă mai târziu." },
      { status: 500 }
    );
  }
}
