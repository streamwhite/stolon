import { describe, expect, it } from "vitest";
import {
  ApiError,
  fromResponse,
  networkError,
  normalizeErrorPayload,
} from "@/lib/api/errors";

describe("normalizeErrorPayload", () => {
  it("extracts known fields from objects", () => {
    const result = normalizeErrorPayload({
      code: "E123",
      message: "Bad",
      details: { field: "name" },
    });
    expect(result).toEqual({
      code: "E123",
      message: "Bad",
      details: { field: "name" },
    });
  });

  it("returns empty payload for non-objects", () => {
    expect(normalizeErrorPayload("oops")).toEqual({});
    expect(normalizeErrorPayload(null)).toEqual({});
    expect(normalizeErrorPayload([1, 2])).toEqual({});
  });
});

describe("ApiError categories", () => {
  it.each([
    [400, "validation"],
    [401, "unauthenticated"],
    [403, "forbidden"],
    [404, "not_found"],
    [409, "conflict"],
    [422, "validation"],
    [429, "rate_limited"],
    [500, "server"],
    [503, "server"],
  ])("maps status %i to %s", (status, category) => {
    const error = fromResponse(status, {});
    expect(error.category).toBe(category);
  });

  it("prefers backend message and code", () => {
    const error = fromResponse(404, { message: "Nope", code: "NF" });
    expect(error.message).toBe("Nope");
    expect(error.code).toBe("NF");
  });

  it("creates network errors with category network", () => {
    const error = networkError();
    expect(error.category).toBe("network");
    expect(error.status).toBe(0);
  });

  it("is an Error instance", () => {
    expect(new ApiError({ status: 400, message: "x" })).toBeInstanceOf(Error);
  });
});
