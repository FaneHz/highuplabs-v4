import CasesContent from "./CasesContent";

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function CasesPage() {
  return <CasesContent />;
}
