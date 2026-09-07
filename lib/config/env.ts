import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  API_INTERNAL_URL: z.url().optional(),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().default("https://api.example.com"),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
});

function readClientEnv(): z.infer<typeof clientEnvSchema> {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });
  if (!parsed.success) {
    throw new Error(
      `Invalid client environment variables: ${parsed.error.message}`,
    );
  }
  return parsed.data;
}

function readServerEnv(): z.infer<typeof serverEnvSchema> {
  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    API_INTERNAL_URL: process.env.API_INTERNAL_URL,
  });
  if (!parsed.success) {
    throw new Error(
      `Invalid server environment variables: ${parsed.error.message}`,
    );
  }
  return parsed.data;
}

/** Client-safe environment (safe to import anywhere). */
export const env = readClientEnv();

/**
 * Server-only environment. Import this only from server code
 * ("server-only" guarded modules). Throws on the client.
 */
export function getServerEnv(): z.infer<typeof serverEnvSchema> {
  if (typeof window !== "undefined") {
    throw new Error("getServerEnv must only be called on the server");
  }
  return readServerEnv();
}
