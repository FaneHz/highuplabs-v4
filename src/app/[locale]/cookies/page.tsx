import CookiesContent from "./CookiesContent";

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function CookiesPage() {
  return <CookiesContent />;
}
