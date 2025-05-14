import { HttpStatusCodes } from "@/shared/constants";
import {
  addKata,
  getAllKatas,
  getKataByDate,
  getKataById,
} from "@/worker/services/katas.service";
import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getKataByIdRoute,
  getKatasRoute,
  getTodayRoute,
  postCreateKataRoute,
  postSolveKataRoute,
} from "./routes";

export const katasHandler = new OpenAPIHono<{ Bindings: Env }>();

katasHandler.openapi(getKatasRoute, async (c) => {
  const katas = await getAllKatas();
  return c.json(katas);
});

katasHandler.openapi(getTodayRoute, async (c) => {
  const kata = await getKataByDate(new Date());
  if (!kata) {
    return c.notFound();
  }
  return c.json(kata);
});

katasHandler.openapi(getKataByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const kata = await getKataById(id);
  if (!kata) {
    return c.json({ message: "Kata not found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(kata);
});

katasHandler.openapi(postSolveKataRoute, async (c) => {
  return c.body(null, HttpStatusCodes.NOT_IMPLEMENTED);
  const { id } = c.req.valid("param");
  const kata = await getKataById(id);
  if (!kata) {
    return c.json({ success: false }, HttpStatusCodes.NOT_FOUND);
  }
  // TODO: Evaluate code against kata.testCode and return results
  console.log(c);
});

katasHandler.openapi(postCreateKataRoute, async (c) => {
  try {
    const data = c.req.valid("json");
    console.log(data);
    const newKata = await addKata(data);
    return c.json(newKata, HttpStatusCodes.CREATED);
  } catch (err) {
    console.error(err);
    return c.body(null, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});
