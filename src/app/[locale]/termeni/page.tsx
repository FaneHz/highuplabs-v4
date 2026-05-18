import TermsContent from "./TermsContent";

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function TermsPage() {
  return <TermsContent />;
}
