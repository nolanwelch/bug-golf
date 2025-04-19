import { z } from "zod";

// Base schema
export const kataSchema = z.object({
  starterCode: z.string(),
  description: z.string().optional(),
  testCode: z.string(),
});
export type Kata = z.infer<typeof kataSchema>;

// Public schema
export const publicKataSchema = kataSchema.omit({ testCode: true });
export type PublicKata = z.infer<typeof publicKataSchema>;

// Admin schema
export const adminKataSchema = kataSchema;
export type AdminKata = z.infer<typeof adminKataSchema>;

// Create / Update objects
export const createKataSchema = kataSchema.pick({
  starterCode: true,
  description: true,
  testCode: true,
});
export type CreateKataInput = z.infer<typeof createKataSchema>;

export const updateKataSchema = createKataSchema.partial();
export type UpdateKataInput = z.infer<typeof updateKataSchema>;

// Solution schema
export const kataSolutionSchema = z.object({
  solution: z.string(),
});
export type SolveKata = z.infer<typeof kataSolutionSchema>;
