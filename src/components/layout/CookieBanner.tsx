"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { useTranslations } from "@/lib/i18n-context";

interface Consent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "hul-consent-v4";
const GA_ID = "G-XXXXXXXXXX"; // Replace with actual GA4 ID

function loadConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

function injectPixel(allowed: boolean) {
  if (!allowed || typeof window === "undefined") return;
  if (document.getElementById("meta-pixel")) return;
  const script = document.createElement("script");
  script.id = "meta-pixel";
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','358583203608980');
    fbq('track','PageView');
  `;
  document.head.appendChild(script);
  const noscript = document.createElement("noscript");
  noscript.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=358583203608980&ev=PageView&noscript=1" />';
  document.body.appendChild(noscript);
}

function injectGA4(allowed: boolean) {
  if (!allowed || typeof window === "undefined") return;
  if (document.getElementById("ga4-script")) return;
  
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  
  const initScript = document.createElement("script");
  initScript.id = "ga4-init";
  initScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { 'anonymize_ip': true });
  `;
  document.head.appendChild(initScript);
}

export default function CookieBanner({ locale }: { locale: Locale }) {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = loadConsent();
    if (!saved) {
      setVisible(true);
    } else {
      setConsent(saved);
      injectPixel(saved.marketing);
      injectGA4(saved.analytics);
    }
  }, []);

  function acceptAll() {
    const all = { essential: true, analytics: true, marketing: true };
    setConsent(all);
    saveConsent(all);
    injectPixel(true);
    injectGA4(true);
    setVisible(false);
  }

  function acceptSelected() {
    saveConsent(consent);
    injectPixel(consent.marketing);
    injectGA4(consent.analytics);
    setVisible(false);
  }

  function acceptEssentialOnly() {
    const essentialOnly = { essential: true, analytics: false, marketing: false };
    setConsent(essentialOnly);
    saveConsent(essentialOnly);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#0A0A0A] border-t-2 border-[#CCFF00]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-[0.2em] mb-2">
              [COOKIE_CONSENT]
            </h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed max-w-2xl font-mono">
              {locale === "ro"
                ? "Folosim cookie-uri esentiale pentru functionare, analitice pentru optimizare (Google Analytics 4) si marketing pentru remarketing (Meta Pixel). Selecteaza ce accepti."
                : "We use essential cookies for functionality, analytics for optimization (Google Analytics 4), and marketing for remarketing (Meta Pixel). Select what you accept."}
            </p>
            <Link
              href={`/${locale}/cookies`}
              className="text-[10px] font-mono text-[#CCFF00] underline hover:no-underline mt-2 inline-block"
            >
              {locale === "ro" ? "Politica cookie completa" : "Full cookie policy"}
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {!customize ? (
              <>
                <button
                  onClick={() => setCustomize(true)}
                  className="px-5 py-2.5 text-[10px] font-mono font-bold text-[#A3A3A3] border border-[#1A1A1A] uppercase tracking-wider hover:border-[#666666] transition-colors"
                >
                  [CUSTOMIZE]
                </button>
                <button
                  onClick={acceptEssentialOnly}
                  className="px-5 py-2.5 text-[10px] font-mono font-bold text-[#A3A3A3] border border-[#1A1A1A] uppercase tracking-wider hover:border-[#666666] transition-colors"
                >
                  [ESSENTIAL_ONLY]
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-[10px] font-mono font-bold text-black bg-[#CCFF00] uppercase tracking-wider hover:bg-[#99CC00] transition-colors"
                >
                  [ACCEPT_ALL]
                </button>
              </>
            ) : (
              <button
                onClick={acceptSelected}
                className="px-5 py-2.5 text-[10px] font-mono font-bold text-black bg-[#CCFF00] uppercase tracking-wider hover:bg-[#99CC00] transition-colors"
              >
                [ACCEPT_SELECTED]
              </button>
            )}
          </div>
        </div>

        {customize && (
          <div className="mt-6 pt-6 border-t border-[#1A1A1A]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {(
                [
                  { key: "essential" as const, locked: true, labelRo: "Esentiale", labelEn: "Essential", descRo: "Functionare site, preferinte limba", descEn: "Site functionality, language prefs" },
                  { key: "analytics" as const, locked: false, labelRo: "Analitice", labelEn: "Analytics", descRo: "Google Analytics 4, masurare trafic", descEn: "Google Analytics 4, traffic measurement" },
                  { key: "marketing" as const, locked: false, labelRo: "Marketing", labelEn: "Marketing", descRo: "Meta Pixel, remarketing, conversii", descEn: "Meta Pixel, remarketing, conversions" },
                ] as const
              ).map(({ key, locked, labelRo, labelEn, descRo, descEn }) => (
                <label
                  key={key}
                  className="flex items-start gap-4 p-4 border border-[#1A1A1A] bg-[#111111] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={consent[key]}
                    disabled={locked}
                    onChange={() =>
                      !locked &&
                      setConsent((c) => ({ ...c, [key]: !c[key] }))
                    }
                    className="w-4 h-4 accent-[#CCFF00] mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white uppercase">
                        {locale === "ro" ? labelRo : labelEn}
                      </span>
                      {locked && (
                        <span className="text-[10px] font-mono text-[#CCFF00]">[REQ]</span>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-[#666666] mt-1">
                      {locale === "ro" ? descRo : descEn}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
