import { DEV_KATA } from "@/shared/dev-kata";
import {
  createKataSchema,
  kataSolutionSchema,
  publicKataSchema,
} from "@/shared/schema/kata.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { v4 as uuidv4 } from "uuid";
import { addKata, getKataById, getKataForDate } from "../utils";

export const katasRouter = new Hono<{ Bindings: Env }>();

katasRouter.get("/today", async (c) => {
  if (c.env.ENVIRONMENT === "development") {
    const parsed = publicKataSchema.parse(DEV_KATA);
    return c.json(parsed);
  }

  const adminKata = await getKataForDate(new Date(), c.env);
  if (!adminKata) {
    return c.json({ success: false }, HttpStatusCodes.NOT_FOUND);
  }

  const parsed = publicKataSchema.safeParse(adminKata);
  if (!parsed.success) {
    console.error(`Invalid adminKata:`, parsed.error);
    return c.json(
      { success: false, message: "Invalid kata data" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return c.json({ success: true, kata: parsed.data });
});

katasRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const adminKata = await getKataById(id, c.env);
  if (!adminKata) {
    return c.json(
      { success: false, message: "Kata not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  const parsed = publicKataSchema.safeParse(adminKata);
  if (!parsed.success) {
    console.error(`Failed to validate publicKata for id=${id}:`, parsed.error);
    return c.json(
      { success: false, message: "Invalid kata data" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return c.json({ success: true, kata: parsed.data });
});

katasRouter.post(
  "/:id/solve",
  zValidator("json", kataSolutionSchema),
  async (c) => {
    const { id } = c.req.param();
    const kata = await getKataById(id, c.env);
    if (!kata) {
      return c.json({ success: false }, HttpStatusCodes.NOT_FOUND);
    }
    // TODO: Evaluate code against kata.testCode and return results
    console.log(c);
  }
);

katasRouter.post("/", zValidator("json", createKataSchema), async (c) => {
  return c.json({ success: false }, HttpStatusCodes.UNAUTHORIZED);
  // TODO: Add auth to kata POST route
  try {
    const data = c.req.valid("json");
    const id = uuidv4();
    console.log(data);
    await addKata(id, data, c.env);
    return c.json({ success: true, id }, HttpStatusCodes.CREATED);
  } catch (err) {
    console.error(err);
  }
});
