import { z } from "@hono/zod-openapi";

export const errorSchema = z.object({
  message: z.string(),
});
export type Error = z.infer<typeof errorSchema>;
