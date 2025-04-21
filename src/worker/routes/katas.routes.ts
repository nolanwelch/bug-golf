import { kataSchema, solutionSchema } from "@/shared/schema/kata.schema";
import { IdParamSchema } from "@/shared/schema/params.schema";
import { createRoute } from "@hono/zod-openapi";
import { enforceAdmin } from "../middleware/auth";

export const getTodayRoute = createRoute({
  method: "get",
  path: "/today",
  responses: {
    200: {
      content: { "application/json": { schema: kataSchema } },
      description: "Get today's kata",
    },
    500: {
      description: "Internal server error",
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

// TODO: Decide whether server-side evaluation is necessary
//  (likely not until user accounts implemented)
export const postSolveKataRoute = createRoute({
  method: "post",
  path: "/{id}/solve",
  request: {
    params: IdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: solutionSchema,
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
    500: {
      description: "Internal server error",
    },
  },
});
