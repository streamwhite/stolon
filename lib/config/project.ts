export interface NavItem {
  href: string;
  labelKey: string;
}

/**
 * Central project configuration for white-label customization.
 * Adjust this file when creating a new project from the template.
 */
export const project = {
  name: "Frontend Template",
  shortName: "Template",
  description:
    "Production-ready frontend template built with Next.js, TypeScript and Tailwind CSS.",
  defaultLocale: "en",
  supportedLocales: ["en", "zh"] as const,
  /**
   * Top-level navigation used by Header.
   * Keys are i18n keys resolved against the "navigation" namespace.
   */
  navigation: [] as NavItem[],
  featureFlags: {
    // Example flag — replace with your project's own flags.
    example: true,
  },
} as const;

export type SupportedLocale = (typeof project.supportedLocales)[number];
