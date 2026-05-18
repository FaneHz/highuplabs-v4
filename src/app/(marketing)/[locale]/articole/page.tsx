import ArticlesContent from "./ArticlesContent";

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function ArticlesPage() {
  return <ArticlesContent />;
}
