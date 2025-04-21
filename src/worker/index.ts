import { OpenAPIHono } from "@hono/zod-openapi";
import { applyMiddleware } from "./middleware";
import { mountRoutes } from "./routes";

// Build API router
const apiRouter = new OpenAPIHono<{ Bindings: Env }>();
applyMiddleware(apiRouter);
mountRoutes(apiRouter);

// Main app with /api and /doc endpoints
const app = new OpenAPIHono<{ Bindings: Env }>();
app.route("/api", apiRouter);
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "0.0.0",
    title: "Bug Golf API",
  },
});

export default app;
