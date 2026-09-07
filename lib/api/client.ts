import { env, getServerEnv } from "@/lib/config/env";
import { ApiError, fromResponse, networkError } from "./errors";
import type { QueryParams, RequestOptions } from "./types";

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_RETRIES = 0;
const RETRYABLE_STATUSES = new Set([502, 503, 504]);
const RETRY_DELAY_MS = 500;

/** Resolves the API base URL (internal URL preferred on the server). */
function getBaseUrl(): string {
  if (typeof window === "undefined") {
    try {
      const { API_INTERNAL_URL } = getServerEnv();
      if (API_INTERNAL_URL) return stripTrailingSlash(API_INTERNAL_URL);
    } catch {
      // fall through to public URL
    }
  }
  return stripTrailingSlash(env.NEXT_PUBLIC_API_URL);
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function buildUrl(path: string, params?: QueryParams): string {
  const url = new URL(`${getBaseUrl()}${path}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

/**
 * Hook for attaching authentication to requests.
 * The template does not pick an auth provider; plug yours in here
 * (e.g. read an httpOnly cookie server-side or a token client-side).
 */
export type TokenProvider = () => string | undefined;

let tokenProvider: TokenProvider | undefined;

export function setTokenProvider(provider: TokenProvider): void {
  tokenProvider = provider;
}

function buildHeaders(extra?: Record<string, string>): Headers {
  const headers = new Headers({
    Accept: "application/json",
    ...extra,
  });
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token = tokenProvider?.();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function execute(
  method: string,
  url: string,
  body: unknown,
  options: RequestOptions,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeout = setTimeout(
    () => controller.abort(new Error("Request timeout")),
    timeoutMs,
  );
  const externalSignal = options.signal;
  const onAbort = () => controller.abort(externalSignal?.reason);
  externalSignal?.addEventListener("abort", onAbort, { once: true });

  try {
    return await fetch(url, {
      method,
      headers: buildHeaders(options.headers),
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
      credentials: "include",
    });
  } finally {
    clearTimeout(timeout);
    externalSignal?.removeEventListener("abort", onAbort);
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const url = buildUrl(path);
  const maxRetries = options.retries ?? DEFAULT_RETRIES;

  let lastError: ApiError | undefined;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await execute(method, url, body, options);
      const parsed = await parseBody(response);
      if (!response.ok) {
        const error = fromResponse(response.status, parsed);
        if (attempt < maxRetries && RETRYABLE_STATUSES.has(response.status)) {
          lastError = error;
          await sleep(RETRY_DELAY_MS * 2 ** attempt);
          continue;
        }
        throw error;
      }
      return parsed as T;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.category === "network" && attempt < maxRetries) {
          lastError = error;
          await sleep(RETRY_DELAY_MS * 2 ** attempt);
          continue;
        }
        throw error;
      }
      throw networkError(
        error instanceof Error ? error.message : "Unknown request failure",
        error,
      );
    }
  }
  throw lastError ?? networkError("Request failed after retries");
}

/** Thin typed API client. All external-backend calls go through this. */
export const api = {
  get: <T>(path: string, options?: RequestOptions & { params?: QueryParams }) =>
    request<T>("GET", buildUrl(path, options?.params), undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
