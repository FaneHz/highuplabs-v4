// Supabase Edge Function: Send email notification for new offers
// Trigger: HTTP request from client

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "HighUpLabs <noreply@highuplabs.ro>";
const TO_EMAIL = "business@highuplabs.ro";

serve(async (req) => {
  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { type, email, fullName, companyName, phone, monthlyRevenue, marginPercent, recommendedBudget, estimatedProfit, commissionPercent, status } = await req.json();

    if (!type || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    let subject = "";
    let html = "";

    if (type === "offer_accepted") {
      subject = `[HighUpLabs] Ofertă Acceptată - ${fullName || email}`;
      html = `
        <h2>Ofertă Acceptată!</h2>
        <p><strong>Client:</strong> ${fullName || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Companie:</strong> ${companyName || "N/A"}</p>
        <p><strong>Telefon:</strong> ${phone || "N/A"}</p>
        <hr/>
        <p><strong>Venituri lunare:</strong> €${monthlyRevenue?.toLocaleString() || "N/A"}</p>
        <p><strong>Marjă:</strong> ${marginPercent || "N/A"}%</p>
        <p><strong>Buget recomandat:</strong> €${recommendedBudget?.toLocaleString() || "N/A"}</p>
        <p><strong>Profit estimat:</strong> €${estimatedProfit?.toLocaleString() || "N/A"}</p>
        <p><strong>Comision:</strong> ${commissionPercent || "N/A"}%</p>
      `;
    } else if (type === "contract_requested") {
      subject = `[HighUpLabs] Solicitare Contract - ${fullName || email}`;
      html = `
        <h2>Solicitare Contract!</h2>
        <p><strong>Client:</strong> ${fullName || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Companie:</strong> ${companyName || "N/A"}</p>
        <p><strong>Telefon:</strong> ${phone || "N/A"}</p>
        <hr/>
        <p><strong>Venituri lunare:</strong> €${monthlyRevenue?.toLocaleString() || "N/A"}</p>
        <p><strong>Marjă:</strong> ${marginPercent || "N/A"}%</p>
        <p><strong>Buget recomandat:</strong> €${recommendedBudget?.toLocaleString() || "N/A"}</p>
        <p><strong>Profit estimat:</strong> €${estimatedProfit?.toLocaleString() || "N/A"}</p>
        <p><strong>Comision:</strong> ${commissionPercent || "N/A"}%</p>
        <hr/>
        <p><strong>Status:</strong> ${status || "N/A"}</p>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid notification type" }), { status: 400 });
    }

    // Send email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: subject,
        html: html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
