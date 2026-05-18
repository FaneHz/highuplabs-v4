"use client";

import { createContext, useContext, ReactNode, isValidElement } from "react";
import roMessages from "@/messages/ro.json";
import enMessages from "@/messages/en.json";
import { Locale } from "@/lib/i18n";

const messagesMap: Record<Locale, any> = {
  ro: roMessages,
  en: enMessages,
};

const LocaleContext = createContext<{ locale: Locale; messages: any }>({
  locale: "ro",
  messages: roMessages,
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, messages: messagesMap[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext).locale;
}

export function useTranslations(namespace?: string) {
  const { locale, messages } = useContext(LocaleContext);

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

  function interpolate(template: string, values?: Record<string, any>): string {
    if (!values) return template;
    return template.replace(/\{(\w+)\}/g, (_match, name) => {
      const val = values[name];
      return val !== undefined ? String(val) : `{${name}}`;
    });
  }

  function rich(key: string, options?: Record<string, any>): ReactNode {
    const value = getValue(key);
    if (typeof value !== "string") return key;

    const parts = value.split(/(\{[^}]+\})/g);
    return parts.map((part, i) => {
      const match = part.match(/\{(\w+)\}/);
      if (match) {
        const val = options?.[match[1]];
        if (isValidElement(val)) {
          return <span key={i}>{val}</span>;
        }
        return <span key={i}>{val !== undefined ? String(val) : part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  return Object.assign(t, { rich });
}
