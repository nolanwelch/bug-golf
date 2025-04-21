import { HttpStatusCodes } from "@/shared/constants";
import { DEV_KATA } from "@/shared/dev-kata";
import { OpenAPIHono } from "@hono/zod-openapi";
import { v4 as uuidv4 } from "uuid";
import { addKata, getKataById, getKataForDate } from "../utils";
import {
  getKataByIdRoute,
  getTodayRoute,
  postCreateKataRoute,
  postSolveKataRoute,
} from "./katas.routes";

export const katasHandler = new OpenAPIHono<{ Bindings: Env }>();

katasHandler.openapi(getTodayRoute, async (c) => {
  if (c.env.ENVIRONMENT === "development") {
    return c.json({ success: true, kata: DEV_KATA });
  }
  const kata = await getKataForDate(new Date(), c.env);
  if (!kata) {
    return c.json({ success: false }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(kata);
});

katasHandler.openapi(getKataByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const kata = await getKataById(id, c.env);
  if (!kata) {
    return c.json({ message: "Kata not found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(kata);
});

katasHandler.openapi(postSolveKataRoute, async (c) => {
  return c.body(null, HttpStatusCodes.NOT_IMPLEMENTED);
  const { id } = c.req.param();
  const kata = await getKataById(id, c.env);
  if (!kata) {
    return c.json({ success: false }, HttpStatusCodes.NOT_FOUND);
  }
  // TODO: Evaluate code against kata.testCode and return results
  console.log(c);
});

katasHandler.openapi(postCreateKataRoute, async (c) => {
  try {
    const data = c.req.valid("json");
    const id = uuidv4();
    console.log(data);
    await addKata(id, data, c.env);
    return c.json({ success: true, id }, HttpStatusCodes.CREATED);
  } catch (err) {
    console.error(err);
    return c.body(null, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});
