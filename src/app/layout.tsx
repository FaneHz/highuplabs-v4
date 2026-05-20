import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "High-Up Labs — Performance Marketing pe Comision",
    template: "%s | High-Up Labs",
  },
  description:
    "Primul model comision-only din Romania. 5-10% din vanzarile aduse de reclame. Zero retainer. 90 zile garantie.",
  keywords: [
    "agentie marketing",
    "performance marketing",
    "meta ads",
    "google ads",
    "comision",
    "romania",
    "pitesti",
    "tiktok ads",
    "poas",
    "roas",
    "agentie facebook ads",
    "agentie google ads",
  ],
  authors: [{ name: "High-Up Labs" }],
  creator: "High-Up Labs",
  publisher: "High-Up Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "High-Up Labs — Performance Marketing pe Comision",
    description:
      "Primul model comision-only din Romania. 5-10% din vanzari. Zero retainer. 90 zile garantie.",
    type: "website",
    locale: "ro_RO",
    siteName: "High-Up Labs",
    url: "https://highuplabs.ro",
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Up Labs — Performance Marketing pe Comision",
    description:
      "Primul model comision-only din Romania. 5-10% din vanzari. Zero retainer. 90 zile garantie.",
  },
  alternates: {
    canonical: "https://highuplabs.ro",
    languages: {
      "ro-RO": "https://highuplabs.ro/ro",
      "en-US": "https://highuplabs.ro/en",
    },
  },
  verification: {
    google: "", // Add Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
