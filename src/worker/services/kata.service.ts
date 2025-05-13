import { Kata } from "@/shared/api/schema/kata.schema";
import { getPrisma } from "@/worker/utils/db";

/**
 * Retrieves all katas from the database.
 *
 * @param db - The D1Database instance used to access the database.
 * @returns A promise that resolves to an array of Kata objects.
 */
export async function getAllKatas(db: D1Database): Promise<Kata[]> {
  const prisma = getPrisma(db);
  return prisma.kata.findMany();
}

/**
 * Retrieves a `Kata` object from the database based on the provided date.
 *
 * @param date - The date for which to retrieve the `Kata`. The date is converted to midnight UTC.
 * @param db - The D1Database instance used to access the database.
 * @returns A promise that resolves to the `Kata` object if found, or `null` if no matching record exists.
 */
export async function getKataByDate(
  date: Date,
  db: D1Database
): Promise<Kata | null> {
  const prisma = getPrisma(db);

  const start = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );
  const end = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );

  return prisma.kata.findFirst({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  });
}

/**
 * Retrieves a kata by its unique identifier from the database.
 *
 * @param id - The unique identifier of the kata to retrieve.
 * @param db - The database instance to use for the query.
 * @returns A promise that resolves to the kata if found, or `null` if no kata exists with the given ID.
 */
export async function getKataById(
  id: number,
  db: D1Database
): Promise<Kata | null> {
  const prisma = getPrisma(db);
  return prisma.kata.findUnique({ where: { id } });
}

export async function addKata(
  data: Omit<Kata, "id">,
  db: D1Database
): Promise<Kata> {
  const prisma = getPrisma(db);
  return prisma.kata.create({ data });
}
