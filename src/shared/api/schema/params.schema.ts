import { z } from "@hono/zod-openapi";

export const IdParamSchema = z.object({
  id: z
    .number()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: 123456,
    }),
});
