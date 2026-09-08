import { RateLimiterMemory } from "rate-limiter-flexible";
import { getServerEnv } from "@/lib/config/env";

export const PAGE_TYPES = ["marketing", "auth", "app"] as const;
export type PageType = (typeof PAGE_TYPES)[number];

const limiters = new Map<PageType, RateLimiterMemory>();

export function getPageType(pathname: string): PageType {
  if (pathname === "/auth" || pathname.startsWith("/auth/")) return "auth";
  if (pathname === "/app" || pathname.startsWith("/app/")) return "app";
  return "marketing";
}

function getLimiter(type: PageType): RateLimiterMemory {
  const existing = limiters.get(type);
  if (existing) return existing;
  const env = getServerEnv();
  const settings = {
    marketing: [env.PAGE_RATE_LIMIT_MARKETING_POINTS, env.PAGE_RATE_LIMIT_MARKETING_DURATION_SECONDS],
    auth: [env.PAGE_RATE_LIMIT_AUTH_POINTS, env.PAGE_RATE_LIMIT_AUTH_DURATION_SECONDS],
    app: [env.PAGE_RATE_LIMIT_APP_POINTS, env.PAGE_RATE_LIMIT_APP_DURATION_SECONDS],
  }[type];
  const limiter = new RateLimiterMemory({ points: settings[0], duration: settings[1] });
  limiters.set(type, limiter);
  return limiter;
}

export function getClientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip") || "unknown";
}

export async function getRetryAfter(type: PageType, key: string): Promise<number | null> {
  try {
    await getLimiter(type).consume(key);
    return null;
  } catch (error) {
    const retryMs = error && typeof error === "object" ? Number(Reflect.get(error, "msBeforeNext")) : Number.NaN;
    if (Number.isFinite(retryMs)) return Math.max(1, Math.ceil(retryMs / 1000));
    throw error;
  }
}