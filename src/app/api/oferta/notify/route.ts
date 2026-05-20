import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getAppConfig } from "@/lib/app-config";

const notifySchema = z.object({
  type: z.enum(["offer_accepted", "offer_rejected", "contract_requested"]),
  email: z.string().email("Email invalid"),
  fullName: z.string().min(1, "Numele este obligatoriu"),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  monthlyRevenue: z.number().optional(),
  marginPercent: z.number().optional(),
  recommendedBudget: z.number().optional(),
  estimatedProfit: z.number().optional(),
  commissionPercent: z.number().optional(),
  status: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = notifySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Date invalide", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const {
      type,
      email,
      fullName,
      companyName,
      phone,
      monthlyRevenue,
      marginPercent,
      recommendedBudget,
      estimatedProfit,
      commissionPercent,
      status,
    } = result.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.includes('xxx') || apiKey.includes('placeholder')) {
      console.error("RESEND_API_KEY nu este configurat corect");
      return NextResponse.json(
        { error: "Serviciul de email nu este configurat. Contactează administratorul." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    let subject = "";
    let html = "";

    if (type === "offer_accepted") {
      subject = `[HighUpLabs] Ofertă Acceptată - ${fullName}`;
      html = `
        <h2>Ofertă Acceptată!</h2>
        <p><strong>Client:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Companie:</strong> ${companyName || "N/A"}</p>
        <p><strong>Telefon:</strong> ${phone || "N/A"}</p>
        <hr/>
        <p><strong>Venituri lunare:</strong> €${monthlyRevenue?.toLocaleString()}</p>
        <p><strong>Marjă:</strong> ${marginPercent}%</p>
        <p><strong>Buget recomandat:</strong> €${recommendedBudget?.toLocaleString()}</p>
        <p><strong>Profit estimat:</strong> €${estimatedProfit?.toLocaleString()}</p>
        <p><strong>Comision:</strong> ${commissionPercent}%</p>
      `;
    } else if (type === "offer_rejected") {
      subject = `[HighUpLabs] Ofertă Respinsă - ${fullName}`;
      html = `
        <h2>Ofertă Respinsă</h2>
        <p><strong>Client:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Companie:</strong> ${companyName || "N/A"}</p>
        <p><strong>Telefon:</strong> ${phone || "N/A"}</p>
        <hr/>
        <p><strong>Venituri lunare:</strong> €${monthlyRevenue?.toLocaleString()}</p>
        <p><strong>Marjă:</strong> ${marginPercent}%</p>
        <p><strong>Buget recomandat:</strong> €${recommendedBudget?.toLocaleString()}</p>
        <p><strong>Profit estimat:</strong> €${estimatedProfit?.toLocaleString()}</p>
        <p><strong>Comision:</strong> ${commissionPercent}%</p>
      `;
    } else if (type === "contract_requested") {
      subject = `[HighUpLabs] Solicitare Contract - ${fullName}`;
      html = `
        <h2>Solicitare Contract!</h2>
        <p><strong>Client:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Companie:</strong> ${companyName || "N/A"}</p>
        <p><strong>Telefon:</strong> ${phone || "N/A"}</p>
        <hr/>
        <p><strong>Venituri lunare:</strong> €${monthlyRevenue?.toLocaleString()}</p>
        <p><strong>Marjă:</strong> ${marginPercent}%</p>
        <p><strong>Buget recomandat:</strong> €${recommendedBudget?.toLocaleString()}</p>
        <p><strong>Profit estimat:</strong> €${estimatedProfit?.toLocaleString()}</p>
        <p><strong>Comision:</strong> ${commissionPercent}%</p>
        <hr/>
        <p><strong>Status:</strong> ${status}</p>
      `;
    } else {
      return NextResponse.json({ error: "Invalid notification type" }, { status: 400 });
    }

    const fromEmail = await getAppConfig("email_from") || "HighUpLabs <noreply@highuplabs.ro>";
    const toEmail = await getAppConfig("email_to") || "business@highuplabs.ro";
    
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
