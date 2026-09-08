import { describe, expect, it } from "vitest";
import { getPageType } from "@/lib/page-rate-limit";

describe("page rate-limit strategies", () => {
  it.each([
    ["/", "marketing"],
    ["/pricing", "marketing"],
    ["/auth/login", "auth"],
    ["/app/dashboard", "app"],
  ])("classifies %s as %s", (pathname, expected) => {
    expect(getPageType(pathname)).toBe(expected);
  });
});