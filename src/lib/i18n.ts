export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export const localePrefix = "always";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
