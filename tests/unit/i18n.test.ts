import { describe, expect, it } from "vitest";
import { project } from "@/lib/config/project";
import { NAMESPACES, resolveLocale } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";

describe("locale resolution", () => {
  it("resolves supported locales", () => {
    expect(resolveLocale("zh")).toBe("zh");
  });

  it("falls back to the default locale", () => {
    expect(resolveLocale("fr")).toBe(project.defaultLocale);
    expect(resolveLocale(undefined)).toBe(project.defaultLocale);
  });
});

/**
 * Translation validation: every locale must expose the same key
 * structure as the source locale (en) for each namespace.
 */
describe("translation completeness", () => {
  const keyTree = (value: unknown, prefix = ""): string[] => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return Object.entries(value).flatMap(([key, child]) =>
        keyTree(child, prefix ? `${prefix}.${key}` : key),
      );
    }
    return [prefix];
  };

  it("has all namespaces for all supported locales", () => {
    for (const locale of project.supportedLocales) {
      expect(Object.keys(resources[locale])).toEqual(
        expect.arrayContaining(NAMESPACES as unknown as string[]),
      );
    }
  });

  it("has consistent keys with the source locale", () => {
    const source = resources.en;
    for (const locale of project.supportedLocales) {
      if (locale === "en") continue;
      for (const ns of NAMESPACES) {
        const expected = keyTree(source[ns]).sort();
        const actual = keyTree(resources[locale][ns]).sort();
        expect(actual).toEqual(expected);
      }
    }
  });
});
