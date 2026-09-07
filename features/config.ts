/**
 * Lightweight local feature flags. Replace values per project;
 * do not add a remote flag service in the base template.
 */
export const featureFlags = {
  dashboard: true,
  settings: true,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}
