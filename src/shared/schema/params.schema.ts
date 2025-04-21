import { z } from "@hono/zod-openapi";

export const IdParamSchema = z.object({
  id: z
    .string()
    .nonempty()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "3c7169ab-781d-43b8-92bf-a2c433abde69",
    }),
});
