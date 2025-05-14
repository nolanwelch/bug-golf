import api from "@/shared/api";
import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.route("/api", api);

export default app;
