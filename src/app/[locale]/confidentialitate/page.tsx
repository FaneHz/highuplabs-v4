import PrivacyContent from "./PrivacyContent";

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
