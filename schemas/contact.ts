import { z } from "zod";

/**
 * Example shared schema. Real feature schemas live next to their
 * feature (features/<name>/schemas/) or here if shared globally.
 */
export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  message: z.string().min(10).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
