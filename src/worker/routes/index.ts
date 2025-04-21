import { Hono } from "hono";
import { katasRouter } from "./katas.ts";

/**
 * Registers all API route groups on the provided router.
 *
 * This function is responsible for mounting all sub-routers under their
 * respective base paths (e.g., /users) to keep routing modular
 * and maintainable as the application grows.
 *
 * @param router - The main API router to attach subroutes to.
 */
export function mountRoutes(router: Hono<{ Bindings: Env }>) {
  router.route("/katas", katasRouter);
}
