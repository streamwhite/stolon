import { project } from "@/lib/config/project";

export const LOCALES = project.supportedLocales;
export const DEFAULT_LOCALE: string = project.defaultLocale;
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const NAMESPACES = [
  "common",
  "navigation",
  "validation",
  "errors",
] as const;

export type Namespace = (typeof NAMESPACES)[number];

export function isLocale(
  value: string | undefined,
): value is (typeof LOCALES)[number] {
  return (LOCALES as readonly string[]).includes(value ?? "");
}

/** Resolves the active locale with fallback to the default. */
export function resolveLocale(candidate: string | undefined): string {
  return isLocale(candidate) ? candidate : DEFAULT_LOCALE;
}
