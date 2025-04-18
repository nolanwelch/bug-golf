import { Hono } from "hono";

const apiRouter = new Hono<{ Bindings: Env }>();

const app = new Hono<{ Bindings: Env }>();
app.route("/api", apiRouter);

export default app;
