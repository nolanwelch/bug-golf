import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { enforceAdmin, enforceAuth } from "./auth.ts";

/**
 * Applies middleware to the API router.
 * Can handle global and route-specific middleware setup.
 */
export function applyMiddleware(router: Hono<{ Bindings: Env }>) {
  // CORS middleware
  router.use(
    cors({
      origin: ["https://buggolf.dev", "http://localhost:5173"],
    })
  );
  // Global Clerk middleware
  router.use(clerkMiddleware());
  // Auth-required routes
  router.use("/protected", enforceAuth);
  // Admin-only routes
  router.use("/admin", enforceAdmin);
}
