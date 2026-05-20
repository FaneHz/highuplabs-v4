import type { Metadata } from "next";
import OfferCalculatorWrapper from "./OfferCalculatorWrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === "ro";

  return {
    title: isRo
      ? "Generează-ți Oferta Personalizată — High-Up Labs"
      : "Generate Your Custom Offer — High-Up Labs",
    description: isRo
      ? "Calculează instant bugetul recomandat, comisionul și profitul estimat. Fără pitch, fără presiune. Doar numere."
      : "Calculate your recommended budget, commission, and estimated profit instantly. No pitch, no pressure. Just numbers.",
    alternates: {
      canonical: `https://highuplabs.ro/${locale}/oferta`,
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function OfertaPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <OfferCalculatorWrapper />
    </main>
  );
}
