import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

const applicationSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere").max(100),
  email: z.string().email("Adresa de email nu este validă"),
  phone: z.string().min(6).max(20).optional(),
  website: z.string().url("Website-ul nu este valid").optional().or(z.literal("")),
  sales: z.string().min(1, "Completează vânzările lunare"),
  budget: z.string().min(1, "Completează bugetul de reclame"),
  message: z.string().max(2000).optional(),
  honeypot: z.literal("").optional(),
});

const ipRequests = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = ipRequests.get(ip) || [];
  const recentRequests = requests.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_MAX) {
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

    if (isRateLimited(ip)) {
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

    try {
      const resend = getResend();
      if (resend) {
        await resend.emails.send({
          from: "High-Up Labs <noreply@highuplabs.ro>",
          to: "business@highuplabs.ro",
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
