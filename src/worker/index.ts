import { Hono } from "hono";
import { katasRouter } from "./routes/katas";

const apiRouter = new Hono<{ Bindings: Env }>();

apiRouter.route("/katas", katasRouter);

const app = new Hono<{ Bindings: Env }>();
app.route("/api", apiRouter);

export default app;
