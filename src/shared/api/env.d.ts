export {};

import type { D1Database } from "@cloudflare/workers-types";

declare global {
  interface Env {
    DB: D1Database;
    ENVIRONMENT: "development" | "production";
  }
}
