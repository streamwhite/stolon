/**
 * Authentication abstraction. The backend is the authoritative source;
 * these types only describe what the frontend needs for UX.
 */
export interface User {
  id: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  roles: readonly Role[];
}

export type Role = string;

export interface Session {
  user: User;
  expiresAt: string;
}
