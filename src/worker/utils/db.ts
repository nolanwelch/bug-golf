import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

const prismaCache = new WeakMap<D1Database, PrismaClient>();

/**
 * Creates and returns a PrismaClient instance configured with a D1Database adapter.
 *
 * @param db - The D1Database instance to be used as the database connection.
 * @returns A PrismaClient instance configured with the provided D1Database adapter.
 */
export function getPrisma(db: D1Database): PrismaClient {
  let client = prismaCache.get(db);
  if (!client) {
    client = new PrismaClient({ adapter: new PrismaD1(db) });
    prismaCache.set(db, client);
  }
  return client;
}
