import { notFound } from "next/navigation";
import { allCases } from "@/content/cases";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n-server";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const c of allCases) {
      params.push({ locale, slug: c.slug });
    }
  }
  return params;
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const c = allCases.find((x) => x.slug === slug);
  if (!c) notFound();

  const ct = c.translations[locale as "ro" | "en"] || c.translations.ro;

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Hero */}
        <div className="mb-16 border-b-2 border-[#CCFF00] pb-16">
          <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em] mb-6">
            {ct.industry}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl">
            {ct.title}
          </h1>
          <p className="mt-6 text-lg text-[#A3A3A3] max-w-2xl leading-relaxed">{ct.hook}</p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#1A1A1A]">
            {ct.heroStats.map((stat) => (
              <div key={stat.label} className="p-6 border-r border-[#1A1A1A] last:border-r-0">
                <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-2">
                  {stat.label}
                </div>
                <div className={`text-2xl md:text-3xl font-black ${stat.highlight ? "text-[#CCFF00]" : "text-white"}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-8 lg:pr-16">
            {ct.sections.map((section, i) => (
              <div key={i} className="mb-16">
                {section.heading && (
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-tight">
                    {section.heading}
                  </h2>
                )}

                {section.intro && (
                  <p className="text-base text-[#A3A3A3] mb-6 leading-relaxed">{section.intro}</p>
                )}

                {section.paragraphs && (
                  <div className="space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base text-[#D4D4D8] leading-[1.7]">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {section.items && section.type !== "mistakes" && section.type !== "learnings" && (
                  <ul className="space-y-3 my-6">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-[#D4D4D8]">
                        <span className="text-[#CCFF00] font-mono text-sm flex-shrink-0">-</span>
                        <span className="leading-[1.7]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.items && section.type === "mistakes" && (
                  <div className="space-y-4 my-6">
                    {section.items.map((item, j) => (
                      <div key={j} className="border-l-2 border-[#EF3E36] pl-6 py-2">
                        <p className="text-sm text-[#D4D4D8] leading-[1.7]">{item}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.items && section.type === "learnings" && (
                  <div className="space-y-4 my-6">
                    {section.items.map((item, j) => (
                      <div key={j} className="border-l-2 border-[#CCFF00] pl-6 py-2">
                        <p className="text-sm text-[#D4D4D8] leading-[1.7]">{item}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.steps && (
                  <div className="space-y-6">
                    {section.steps.map((step, j) => (
                      <div key={j} className="border-l-2 border-[#CCFF00] pl-6">
                        <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider mb-2">
                          PAS {String(j + 1).padStart(2, "0")}
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-[#D4D4D8] leading-relaxed">{step.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.shots && (
                  <div className="space-y-4 my-6">
                    {section.shots.map((shot, j) => (
                      <div key={j} className="border border-[#1A1A1A] bg-[#0A0A0A] p-4">
                        <div className="aspect-video bg-[#111111] flex items-center justify-center overflow-hidden">
                          <img
                            src={shot.src}
                            alt={shot.alt}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <p className="mt-3 text-xs text-[#A3A3A3]">{shot.caption}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.rows && (
                  <div className="my-6 overflow-x-auto border border-[#1A1A1A]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1A1A1A] bg-[#111111]">
                          <th className="text-left p-4 text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider">INDICATOR</th>
                          <th className="text-left p-4 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">ÎNAINTE</th>
                          <th className="text-left p-4 text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider">DUPĂ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row, j) => (
                          <tr key={j} className="border-b border-[#1A1A1A] last:border-b-0">
                            <td className="p-4 text-white font-medium">{row.label}</td>
                            <td className="p-4 text-[#A3A3A3]">{row.before}</td>
                            <td className="p-4 text-[#CCFF00] font-bold">{row.after}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.type === "quote" && section.text && (
                  <blockquote className="my-8 border-l-2 border-[#CCFF00] pl-6 py-2">
                    <p className="text-lg md:text-xl text-white italic leading-relaxed">"{section.text}"</p>
                    {section.attribution && (
                      <footer className="mt-4 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">
                        {section.attribution}
                      </footer>
                    )}
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 lg:pl-16 mt-16 lg:mt-0">
            <div className="sticky top-24">
              <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-6">
                Alte studii de caz
              </div>
              <div className="space-y-0 border border-[#1A1A1A]">
                {allCases
                  .filter((x) => x.slug !== slug)
                  .map((x) => {
                    const xt = x.translations[locale as "ro" | "en"] || x.translations.ro;
                    return (
                      <Link
                        key={x.slug}
                        href={`/${locale}/studii-de-caz/${x.slug}`}
                        className="block p-4 border-b border-[#1A1A1A] last:border-b-0 hover:bg-[#0A0A0A] transition-colors"
                      >
                        <div className="text-[10px] font-mono text-[#CCFF00] mb-1">{xt.industry}</div>
                        <div className="text-sm text-white leading-snug">{xt.title}</div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
