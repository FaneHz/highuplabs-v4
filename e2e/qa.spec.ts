import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";
const LOCALES = ["ro"];

const slugs = [
  "ce-este-brand-scaling",
  "ce-este-poas",
  "roas-vs-poas",
  "marja-neta-salvare-sau-moartea",
  "ad-spend-media-budget-break-even",
  "11-red-flags-agentii",
  "retainer-vs-comision",
  "self-audit-agentie-30-min",
  "esti-pregatit-de-scaling",
  "cum-recunosti-agentia-care-te-fura",
  "mai-optimizam-scuze-agentie",
  "metrici-inventate",
  "produs-prost-nu-e-vina-agentiei",
  "ce-ai-nevoie-inainte-de-agentie",
  "cum-sa-calculezi-marja-neta",
];

const caseSlugs = ["trotinete-electrice", "agentie-turism-arges"];

function page(name: string, path: string) {
  test(name, async ({ page }) => {
    const res = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);
    await expect(page.locator("text=404")).not.toBeVisible();
    const body = await page.locator("body").textContent();
    expect(body?.length).toBeGreaterThan(500);
  });
}

for (const locale of LOCALES) {
  page(`Home /${locale}`, `/${locale}`);
  page(`Articles /${locale}/articole`, `/${locale}/articole`);
  page(`Cases /${locale}/studii-de-caz`, `/${locale}/studii-de-caz`);
  page(`About /${locale}/despre`, `/${locale}/despre`);
  page(`Apply /${locale}/aplica`, `/${locale}/aplica`);
  page(`Terms /${locale}/termeni`, `/${locale}/termeni`);
  page(`Privacy /${locale}/confidentialitate`, `/${locale}/confidentialitate`);
  page(`Cookies /${locale}/cookies`, `/${locale}/cookies`);

  for (const slug of slugs) {
    page(`Article /${locale}/articole/${slug}`, `/${locale}/articole/${slug}`);
  }
  for (const slug of caseSlugs) {
    page(`Case /${locale}/studii-de-caz/${slug}`, `/${locale}/studii-de-caz/${slug}`);
  }

  test(`Fashion NDA 404 /${locale}/studii-de-caz/fashion-nda`, async ({ page }) => {
    const res = await page.goto(`${BASE}/${locale}/studii-de-caz/fashion-nda`, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(404);
  });

  test(`Old slug 404 /${locale}/articole/retainerul-de-1500`, async ({ page }) => {
    const res = await page.goto(`${BASE}/${locale}/articole/retainerul-de-1500`, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(404);
  });
}

test("All internal links valid", async ({ page }) => {
  await page.goto(`${BASE}/ro`, { waitUntil: "networkidle" });
  const links = await page.locator("a[href^='/']").all();
  const hrefs = new Set<string>();
  for (const link of links) {
    const href = await link.getAttribute("href");
    if (href) hrefs.add(href);
  }
  for (const href of hrefs) {
    const res = await page.request.get(`${BASE}${href}`);
    expect(res.status(), `Link ${href} should be 200`).toBe(200);
  }
});
