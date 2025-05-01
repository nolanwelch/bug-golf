import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

/**
 * Creates and returns a PrismaClient instance configured with a D1Database adapter.
 *
 * @param db - The D1Database instance to be used as the database connection.
 * @returns A PrismaClient instance configured with the provided D1Database adapter.
 */
export function getPrisma(db: D1Database): PrismaClient {
  const adapter = new PrismaD1(db);
  const prisma = new PrismaClient({ adapter });
  return prisma;
}
