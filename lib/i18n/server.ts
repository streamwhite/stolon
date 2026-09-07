import { createInstance, type i18n as I18nInstance } from "i18next";
import { cookies } from "next/headers";
import {
  LOCALE_COOKIE,
  NAMESPACES,
  type Namespace,
  resolveLocale,
} from "./config";
import { resources } from "./resources";

/** Reads the active locale from the request cookies (SSR). */
export async function getServerLocale(): Promise<string> {
  const store = await cookies();
  return resolveLocale(store.get(LOCALE_COOKIE)?.value);
}

/** Creates a fully initialized i18next instance for server rendering. */
export async function getServerI18n(locale?: string): Promise<I18nInstance> {
  const lng = locale ?? (await getServerLocale());
  const instance = createInstance({
    lng,
    fallbackLng: "en",
    ns: NAMESPACES as unknown as string[],
    defaultNS: "common",
    resources,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  await instance.init();
  return instance;
}

/**
 * Returns a translation function for a single namespace,
 * for use in Server Components.
 */
export async function getTranslations(namespace: Namespace) {
  const i18n = await getServerI18n();
  return i18n.getFixedT(null, namespace);
}
