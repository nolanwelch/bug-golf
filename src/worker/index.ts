import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { applyMiddleware } from "./middleware";
import { mountRoutes } from "./routes";

const apiRouter = new OpenAPIHono<{ Bindings: Env }>();

applyMiddleware(apiRouter);
mountRoutes(apiRouter);

apiRouter.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "0.0.0",
    title: "Bug Golf API",
  },
});

const app = new Hono<{ Bindings: Env }>();
app.route("/api", apiRouter);

export default app;
