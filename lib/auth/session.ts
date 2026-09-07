import type { Session, User } from "./types";

/**
 * Hook point for a real auth provider (NextAuth, Clerk, custom, ...).
 * The template ships a no-op implementation; replace `getSession`,
 * `isAuthenticated` wiring when connecting your backend.
 */
export function getSession(): Promise<Session | null> {
  return Promise.resolve(null);
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}
