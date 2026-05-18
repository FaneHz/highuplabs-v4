import { MetadataRoute } from "next";
import { allArticles } from "@/content/articles";
import { allCases } from "@/content/cases";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://highuplabs.ro";
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, freq: "daily" as const },
    { path: "despre", priority: 0.8, freq: "weekly" as const },
    { path: "aplica", priority: 0.9, freq: "weekly" as const },
    { path: "articole", priority: 0.8, freq: "weekly" as const },
    { path: "studii-de-caz", priority: 0.8, freq: "weekly" as const },
    { path: "termeni", priority: 0.3, freq: "yearly" as const },
    { path: "confidentialitate", priority: 0.3, freq: "yearly" as const },
    { path: "cookies", priority: 0.3, freq: "yearly" as const },
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Static routes for both locales
  for (const locale of ["ro", "en"]) {
    for (const route of staticRoutes) {
      routes.push({
        url: `${baseUrl}/${locale}/${route.path}`,
        lastModified: now,
        changeFrequency: route.freq,
        priority: route.priority,
      });
    }
  }

  // Articles (RO only for now, EN can be added)
  for (const article of allArticles) {
    routes.push({
      url: `${baseUrl}/ro/articole/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Case studies
  for (const c of allCases) {
    routes.push({
      url: `${baseUrl}/ro/studii-de-caz/${c.slug}`,
      lastModified: new Date(c.publishedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}
