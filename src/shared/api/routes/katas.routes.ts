import { kataSchema, submissionSchema } from "@/shared/api/schema/kata.schema";
import { IdParamSchema } from "@/shared/api/schema/params.schema";
import { createRoute } from "@hono/zod-openapi";
import { enforceAdmin, enforceAuth } from "../middleware/auth";

export const getTodayRoute = createRoute({
  method: "get",
  path: "/today",
  responses: {
    200: {
      content: { "application/json": { schema: kataSchema } },
      description: "Get today's kata",
    },
    404: {
      description: "Kata not found",
    },
  },
});

export const getKatasRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: { "application/json": { schema: kataSchema.array() } },
      description: "Get all katas",
    },
  },
});

export const getKataByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: kataSchema,
        },
      },
      description: "Get the specified kata",
    },
    404: {
      description: "Kata not found",
    },
  },
});

export const postSolveKataRoute = createRoute({
  method: "post",
  path: "/{id}/solve",
  middleware: [enforceAuth],
  request: {
    params: IdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: submissionSchema,
        },
      },
    },
  },
  responses: {
    501: {
      description: "Not implemented",
    },
  },
});

export const postCreateKataRoute = createRoute({
  method: "post",
  path: "/",
  middleware: [enforceAdmin],
  request: {
    body: {
      content: {
        "application/json": {
          schema: kataSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Kata created successfully",
    },
  },
});
