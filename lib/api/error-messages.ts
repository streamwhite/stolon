import type { ApiErrorCategory } from "./errors";

/**
 * Maps API error categories to i18n keys in the "errors" namespace,
 * so every failure renders a consistent, translated message.
 */
export const ERROR_MESSAGE_KEYS: Record<ApiErrorCategory, string> = {
  validation: "validation",
  unauthenticated: "unauthenticated",
  forbidden: "forbidden",
  not_found: "not_found",
  conflict: "conflict",
  rate_limited: "rate_limited",
  server: "server",
  network: "network",
  unknown: "unknown",
};
