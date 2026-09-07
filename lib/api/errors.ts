import type { ErrorPayload } from "./types";

export type ApiErrorCategory =
  | "validation"
  | "unauthenticated"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "rate_limited"
  | "server"
  | "network"
  | "unknown";

const STATUS_CATEGORIES: Record<number, ApiErrorCategory> = {
  400: "validation",
  401: "unauthenticated",
  403: "forbidden",
  404: "not_found",
  409: "conflict",
  422: "validation",
  429: "rate_limited",
};

function categoryFromStatus(status: number): ApiErrorCategory {
  if (STATUS_CATEGORIES[status]) return STATUS_CATEGORIES[status];
  if (status >= 500) return "server";
  return "unknown";
}

/**
 * Normalized error for every failed API interaction.
 * UI code should branch on `category`, never on raw backend payloads.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly category: ApiErrorCategory;
  readonly code: string | undefined;
  readonly details: unknown;

  constructor(params: {
    status: number;
    message: string;
    category?: ApiErrorCategory;
    code?: string;
    details?: unknown;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.category = params.category ?? categoryFromStatus(params.status);
    this.code = params.code;
    this.details = params.details;
  }
}

export function networkError(
  message = "Network request failed",
  details?: unknown,
): ApiError {
  return new ApiError({
    status: 0,
    message,
    category: "network",
    details,
  });
}

/**
 * Normalizes unknown payloads (backend error body or thrown value)
 * into a safe ErrorPayload without trusting its shape.
 */
export function normalizeErrorPayload(value: unknown): ErrorPayload {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    return {
      code: typeof record.code === "string" ? record.code : undefined,
      message: typeof record.message === "string" ? record.message : undefined,
      details: record.details ?? record.errors,
    };
  }
  return {};
}

export function fromResponse(status: number, body: unknown): ApiError {
  const payload = normalizeErrorPayload(body);
  return new ApiError({
    status,
    message: payload.message ?? `Request failed with status ${status}`,
    code: payload.code,
    details: payload.details,
  });
}
