import type { Role, User } from "./types";

/**
 * Explicit permission catalog. Add new permissions here, never inline
 * ad-hoc permission strings in components.
 */
export const PERMISSIONS = {
  usersRead: "users.read",
  usersCreate: "users.create",
  usersUpdate: "users.update",
  usersDelete: "users.delete",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Map roles to permissions. Replace with backend-provided permissions
 * when your auth provider supplies them.
 */
const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  admin: Object.values(PERMISSIONS),
  user: [PERMISSIONS.usersRead],
};

function permissionsFor(user: Pick<User, "roles">): Set<string> {
  const permissions = user.roles.flatMap(
    (role) => ROLE_PERMISSIONS[role] ?? [],
  );
  return new Set(permissions);
}

/** Central authorization check. UX only — the backend must enforce. */
export function can(
  user: Pick<User, "roles"> | null | undefined,
  permission: Permission,
): boolean {
  if (!user) return false;
  return permissionsFor(user).has(permission);
}

export function hasRole(
  user: Pick<User, "roles"> | null | undefined,
  role: Role,
): boolean {
  return user?.roles.includes(role) ?? false;
}
