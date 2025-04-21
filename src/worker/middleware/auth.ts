import { HttpStatusCodes } from "@/shared/constants";
import { createClerkClient } from "@clerk/backend";
import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

const authClient = createClerkClient({
  secretKey: import.meta.env.VITE_CLERK_SECRET_KEY,
});

/**
 * Middleware that enforces authentication using Clerk.
 *
 * Requires the request to have a valid, logged-in Clerk session.
 * If no valid session is found, responds with 401 Unauthorized.
 */
export const enforceAuth = createMiddleware(async (c, next) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    console.warn("[Auth] Unauthorized access attempt.");
    return c.json(
      {
        error: "unauthorized",
        message: "You are not logged in.",
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  console.log(`[Auth] User ${auth.userId} authenticated successfully`);
  await next();
});

type RequireRoleOptions = {
  requireAll?: boolean;
  metadataSource?: "public" | "private" | "both";
};

/**
 * Factory that creates a middleware enforcing the presence of specified role(s).
 *
 * @param requiredRoles - A single role or array of roles required to access the resource.
 * @param options.requireAll - If true (default), the user must have *all* roles. If false, the user only needs *one*.
 * @param options.metadataSource - Where to pull roles from: "public", "private", or "both" (default: "public").
 */
export function requireRole(
  requiredRoles: string | string[],
  options: RequireRoleOptions = {}
) {
  const { requireAll = true, metadataSource = "public" } = options;
  const rolesArray = Array.isArray(requiredRoles)
    ? requiredRoles
    : [requiredRoles];

  if (rolesArray.length === 0) {
    console.warn("[Auth] No roles provided to requireRole middleware.");
  }

  return createMiddleware(async (c, next) => {
    await enforceAuth(c, async () => {});

    const auth = getAuth(c)!;
    const user = await authClient.users.getUser(auth.userId!);

    const publicRoles = Array.isArray(user.publicMetadata.roles)
      ? user.publicMetadata.roles
      : [];
    const privateRoles = Array.isArray(user.privateMetadata.roles)
      ? user.privateMetadata.roles
      : [];

    let combinedRoles: string[] = [];
    switch (metadataSource) {
      case "public":
        combinedRoles = publicRoles;
        break;
      case "private":
        combinedRoles = privateRoles;
        break;
      case "both":
        combinedRoles = [...new Set([...publicRoles, ...privateRoles])];
    }

    // Ensure that all roles are a string
    combinedRoles = combinedRoles.filter(
      (r): r is string => typeof r === "string"
    );

    const hasRequiredRoles = requireAll
      ? rolesArray.every((role) => combinedRoles.includes(role))
      : rolesArray.some((role) => combinedRoles.includes(role));

    if (!hasRequiredRoles) {
      console.warn(
        `[Auth] User ${auth.userId} lacks required role(s): ${rolesArray.join(", ")}`
      );
      return c.json(
        {
          error: "forbidden",
          message: "You do not have permission to access this resource.",
        },
        HttpStatusCodes.FORBIDDEN
      );
    }

    console.log(
      `[Auth] User ${auth.userId} passed role check: ${rolesArray.join(", ")} from ${metadataSource} metadata`
    );
    await next();
  });
}

/**
 * Middleware that enforces authentication and requires the user to have the "admin" role.
 *
 * Checks public Clerk metadata for roles.
 * Responds with 403 Forbidden if the role check fails, or 401 Unauthorized if no valid session is found.
 */
export const enforceAdmin = requireRole("admin", { metadataSource: "public" });
