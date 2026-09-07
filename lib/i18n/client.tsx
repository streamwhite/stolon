"use client";

import { createInstance, type i18n as I18nInstance } from "i18next";
import { createContext, type ReactNode, useContext, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { NAMESPACES, type Namespace } from "./config";
import { resources } from "./resources";

const I18nContext = createContext<I18nInstance | null>(null);

export function createClientI18n(locale: string): I18nInstance {
  const instance = createInstance({
    lng: locale,
    fallbackLng: resources.en ? "en" : locale,
    ns: NAMESPACES as unknown as string[],
    defaultNS: "common",
    resources,
    interpolation: { escapeValue: false },
    returnNull: false,
    react: { useSuspense: false },
  });
  void instance.init();
  return instance;
}

/** Supplies a server-resolved locale + bundled resources to the client tree. */
export function I18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const instance = createClientI18n(locale);
  useEffect(() => {
    if (instance.language !== locale) {
      void instance.changeLanguage(locale);
    }
  }, [instance, locale]);

  return (
    <I18nContext.Provider value={instance}>
      <I18nextProvider i18n={instance}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
}

export function useI18nInstance(): I18nInstance {
  const instance = useContext(I18nContext);
  if (!instance) {
    throw new Error("useI18nInstance must be used within I18nProvider");
  }
  return instance;
}

export type { Namespace };
