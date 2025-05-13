import { Kata } from "@/shared/api/schema/kata.schema";
import { getPrisma } from "./db";

export function formatDate(d?: Date): string {
  if (typeof d === "undefined") {
    d = new Date();
  }
  return d.toISOString().slice(0, 10); // "2025-04-18"
}

export async function assignRandomKataForToday(db: D1Database) {
  const today = formatDate(new Date());
  // If already assigned, just return it
  const existing = await env.KATAS.get(`assignment:${today}`);
  if (existing) {
    return;
  }

  // List all unassigned pool keys
  const { keys } = await env.KATAS.list({ prefix: "pool:" });
  if (!keys.length) {
    throw new Error("No katas left in pool");
  }

  // Pick an unassigned key at random
  const rnd = Math.floor(Math.random() * keys.length);
  const poolKey = keys[rnd].name; // e.g. "pool:kata123"
  const kataId = poolKey.replace(/^pool:/, "");

  // Record the assignment and remove from pool
  await env.KATAS.put(`assignment:${today}`, kataId);
  await env.KATAS.delete(poolKey);

  return;
}

export async function addKata(kata: Kata, db: D1Database) {
  const prisma = getPrisma(db);
  const newKata = await prisma.kata.create(kata);
  return newKata;
}

export async function getKataForDate(
  date: Date,
  db: D1Database
): Promise<Kata | null> {
  const prisma = getPrisma(db);
  const kata = await prisma.findFirst({
    where: {
      date: {
        equals: date,
      },
    },
  });
}

export async function getAllKatas(db: D1Database) {
  const prisma = getPrisma(db);
  return prisma.kata.findMany();
}

export async function getKataById(id: number, db: D1Database) {
  const prisma = getPrisma(db);
  return prisma.kata.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
}
