import AboutContent from "./AboutContent";

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function AboutPage() {
  return <AboutContent />;
}
