import { PrismaClient } from "@/generated/prisma";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Returns a cached PrismaClient instance.
 *
 * @returns A PrismaClient instance.
 */
export function getPrisma(): PrismaClient {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  return globalThis.prisma;
}
