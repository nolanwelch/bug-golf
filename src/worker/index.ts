import { Hono } from "hono";
import { applyMiddleware } from "./middleware";
import { mountRoutes } from "./routes";

const apiRouter = new Hono<{ Bindings: Env }>();

applyMiddleware(apiRouter);
mountRoutes(apiRouter);

const app = new Hono<{ Bindings: Env }>();
app.route("/api", apiRouter);

export default app;
