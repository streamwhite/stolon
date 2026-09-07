/** Standard pagination envelope for list endpoints. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** A generic problem/detail payload some backends return with errors. */
export interface ErrorPayload {
  code?: string;
  message?: string;
  details?: unknown;
}

/** Minimal request options supported by the API client. */
export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
  retries?: number;
}

export type QueryValue = string | number | boolean | undefined | null;

export type QueryParams = Record<string, QueryValue>;
