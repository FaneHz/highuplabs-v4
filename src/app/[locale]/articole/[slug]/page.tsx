import { notFound } from "next/navigation";
import { allArticles } from "@/content/articles";
import ArticleRenderer from "@/components/content/ArticleRenderer";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n-server";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const article of allArticles) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const at = article.translations[locale as "ro" | "en"] || article.translations.ro;

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main content */}
          <div className="lg:col-span-8 lg:border-r border-[#1A1A1A] lg:pr-16">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.2em]">
                  {article.tag}
                </span>
                <span className="text-[10px] font-mono text-[#808080]">
                  {article.readTime[locale as "ro" | "en"] || article.readTime.ro}
                </span>
                <span className="text-[10px] font-mono text-[#808080]">
                  {article.publishedAt}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                {at.title}
              </h1>
              <p className="mt-6 text-lg text-[#A3A3A3] leading-relaxed">{at.hook}</p>
            </div>

            <div className="border-t border-[#1A1A1A] pt-12">
              <ArticleRenderer blocks={at.blocks} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:pl-16 mt-16 lg:mt-0">
            <div className="sticky top-24">
              <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-6">
                [ALTE_ARTICOLE]
              </div>
              <div className="space-y-0 border border-[#1A1A1A]">
                {allArticles
                  .filter((a) => a.slug !== slug)
                  .slice(0, 5)
                  .map((a) => {
                    const at2 = a.translations[locale as "ro" | "en"] || a.translations.ro;
                    return (
                      <Link
                        key={a.slug}
                        href={`/${locale}/articole/${a.slug}`}
                        className="block p-4 border-b border-[#1A1A1A] last:border-b-0 hover:bg-[#0A0A0A] transition-colors"
                      >
                        <div className="text-[10px] font-mono text-[#CCFF00] mb-1">{a.tag}</div>
                        <div className="text-sm text-white leading-snug">{at2.title}</div>
                      </Link>
                    );
                  })}
              </div>

              <div className="mt-8 p-6 bg-[#111111] border border-[#1A1A1A]">
                <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.2em] mb-3">
                  [CTA]
                </div>
                <p className="text-sm text-[#A3A3A3] mb-4">
                  Vrei audit gratuit pe businessul tau? 30 de minute, fara obligatie.
                </p>
                <Link
                  href={`/${locale}/aplica`}
                  className="inline-block px-5 py-2.5 bg-[#CCFF00] text-black text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#99CC00] transition-colors"
                >
                  [APLICA]
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
