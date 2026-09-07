import { describe, expect, it } from "vitest";
import { can, hasRole, PERMISSIONS } from "@/lib/auth/permissions";

describe("authorization", () => {
  const admin = { roles: ["admin"] };
  const user = { roles: ["user"] };

  it("grants admin all permissions", () => {
    expect(can(admin, PERMISSIONS.usersDelete)).toBe(true);
    expect(can(admin, PERMISSIONS.usersCreate)).toBe(true);
  });

  it("restricts user role to its permissions", () => {
    expect(can(user, PERMISSIONS.usersRead)).toBe(true);
    expect(can(user, PERMISSIONS.usersDelete)).toBe(false);
  });

  it("denies missing or anonymous users", () => {
    expect(can(null, PERMISSIONS.usersRead)).toBe(false);
    expect(can(undefined, PERMISSIONS.usersRead)).toBe(false);
  });

  it("checks roles", () => {
    expect(hasRole(user, "user")).toBe(true);
    expect(hasRole(user, "admin")).toBe(false);
    expect(hasRole(null, "admin")).toBe(false);
  });
});
