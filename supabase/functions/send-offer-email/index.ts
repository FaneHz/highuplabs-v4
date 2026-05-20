// Supabase Edge Function: Send email notification for new offers
// Trigger: HTTP request from client

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const FROM_EMAIL = "HighUpLabs <noreply@highuplabs.ro>";
const TO_EMAIL = "business@highuplabs.ro";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Validate RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
    } = body;

    // Validate required fields
    if (!type || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: type and email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!["offer_accepted", "offer_rejected", "contract_requested"].includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid notification type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build email
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
    } else if (type === "offer_rejected") {
      subject = `[HighUpLabs] Ofertă Respinsă - ${fullName || email}`;
      html = `
        <h2>Ofertă Respinsă</h2>
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
      const errorText = await response.text();
      console.error("Resend API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errorText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
