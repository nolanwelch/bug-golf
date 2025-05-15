export {};

declare global {
  interface Env {
    ENVIRONMENT: "development" | "production";
  }
}
