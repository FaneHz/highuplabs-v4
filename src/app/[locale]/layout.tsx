import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { isValidLocale, type Locale, locales } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/i18n-context";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import SmoothScroll from "@/components/effects/SmoothScroll";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import CustomCursor from "@/components/effects/CustomCursor";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-mono",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === "ro";

  return {
    title: {
      default: isRo
        ? "High-Up Labs — Performance Marketing pe Comision"
        : "High-Up Labs — Commission-Based Performance Marketing",
      template: "%s | High-Up Labs",
    },
    description: isRo
      ? "Primul model comision-only din Romania. 5-10% din vanzarile aduse de reclame. Zero retainer. 90 zile garantie."
      : "Romania's first commission-only model. 5-10% of ad-generated sales. Zero retainer. 90-day guarantee.",
    alternates: {
      canonical: `https://highuplabs.ro/${locale}`,
      languages: {
        "ro-RO": "https://highuplabs.ro/ro",
        "en-US": "https://highuplabs.ro/en",
      },
    },
    openGraph: {
      locale: isRo ? "ro_RO" : "en_US",
      siteName: "High-Up Labs",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} cursor-none`}>
        <LocaleProvider locale={locale as Locale}>
          <SmoothScroll>
            <CustomCursor />
            <NoiseOverlay />
            <Navigation locale={locale as Locale} />
            <main>{children}</main>
            <Footer locale={locale as Locale} />
            <CookieBanner locale={locale as Locale} />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
