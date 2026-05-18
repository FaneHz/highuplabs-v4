import roMessages from "@/messages/ro.json";
import enMessages from "@/messages/en.json";
import { Locale } from "@/lib/i18n";

const messagesMap: Record<Locale, any> = {
  ro: roMessages,
  en: enMessages,
};

function interpolate(template: string, values?: Record<string, any>): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_match, name) => {
    const val = values[name];
    return val !== undefined ? String(val) : `{${name}}`;
  });
}

export function getTranslations(locale: Locale, namespace?: string) {
  const messages = messagesMap[locale];

  function getValue(key: string): any {
    const keys = namespace ? `${namespace}.${key}`.split(".") : key.split(".");
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  }

  function t(key: string, options?: Record<string, any>): any {
    const value = getValue(key);

    if (typeof value === "string") {
      return interpolate(value, options);
    }

    if (typeof value === "object" && options?.count !== undefined) {
      const count = Number(options.count);
      const pluralKey = count === 1 ? "one" : "other";
      const pluralValue = value?.[pluralKey];
      if (typeof pluralValue === "string") {
        return interpolate(pluralValue, options);
      }
    }

    return value ?? key;
  }

  return Object.assign(t, { raw: getValue });
}
