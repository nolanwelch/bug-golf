import { OpenAPIHono } from "@hono/zod-openapi";
import { applyMiddleware } from "./middleware";
import { mountRoutes } from "./routes";

const api = new OpenAPIHono<{ Bindings: Env }>();

applyMiddleware(api);
mountRoutes(api);

api.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "0.0.0",
    title: "Bug Golf API",
  },
});

export type AppType = typeof api;

export default api;
