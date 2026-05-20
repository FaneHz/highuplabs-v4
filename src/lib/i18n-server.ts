import roMessages from "@/messages/ro.json";
import enMessages from "@/messages/en.json";
import { Locale } from "@/lib/i18n";

const messagesMap: Record<Locale, Record<string, unknown>> = {
  ro: roMessages as Record<string, unknown>,
  en: enMessages as Record<string, unknown>,
};

function interpolate(template: string, values?: Record<string, unknown>): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_match, name) => {
    const val = values[name];
    return val !== undefined ? String(val) : `{${name}}`;
  });
}

export function getTranslations(locale: Locale, namespace?: string) {
  const messages = messagesMap[locale];

  function getValue(key: string): unknown {
    const keys = namespace ? `${namespace}.${key}`.split(".") : key.split(".");
    let obj: unknown = messages;
    for (const k of keys) {
      if (typeof obj !== "object" || obj === null) return undefined;
      obj = (obj as Record<string, unknown>)[k];
    }
    return obj;
  }

  function t(key: string, options?: Record<string, unknown>): string {
    const value = getValue(key);

    if (typeof value === "string") {
      return interpolate(value, options);
    }

    if (typeof value === "object" && value !== null && options?.count !== undefined) {
      const count = Number(options.count);
      const pluralKey = count === 1 ? "one" : "other";
      const pluralValue = (value as Record<string, unknown>)[pluralKey];
      if (typeof pluralValue === "string") {
        return interpolate(pluralValue, options);
      }
    }

    return typeof value === "string" ? value : key;
  }

  return Object.assign(t, { raw: getValue });
}
