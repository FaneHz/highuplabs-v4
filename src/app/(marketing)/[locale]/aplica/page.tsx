import ApplyForm from "./ApplyForm";

export async function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "en" }];
}

export default function ApplyPage() {
  return <ApplyForm />;
}
