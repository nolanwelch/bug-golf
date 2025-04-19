import { Kata } from "@/shared/schema/kata.schema";

export function formatDate(d?: Date): string {
  if (typeof d === "undefined") {
    d = new Date();
  }
  return d.toISOString().slice(0, 10); // "2025-04-18"
}

export async function assignRandomKataForToday(env: Env) {
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

export async function addKata(id: string, kata: Kata, env: Env) {
  await env.KATAS.put(`kata:${id}`, JSON.stringify(kata));
  await env.KATAS.put(`pool:${id}`, "");
}

export async function getKataForDate(
  date: Date,
  env: Env
): Promise<Kata | null> {
  const dateString = formatDate(date);
  const kataId = await env.KATAS.get(`assignment:${dateString}`);
  if (!kataId) {
    return null;
  }
  const data = await env.KATAS.get(`kata:${kataId}`);
  return data ? JSON.parse(data) : null;
}
