"use client";

import dynamic from "next/dynamic";

const OfferCalculator = dynamic(
  () => import("@/components/sections/OfferCalculator"),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export default function OfferCalculatorWrapper() {
  return <OfferCalculator />;
}
