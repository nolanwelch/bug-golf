import {
  KataSchema as GeneratedKataSchema,
  TestCaseSchema as GeneratedTestCaseSchema,
} from "@/generated/zod";
import { z } from "@hono/zod-openapi";

// Kata
export const kataSchema = GeneratedKataSchema.openapi("Kata");
export type Kata = z.infer<typeof kataSchema>;

// TestCase
export const testCaseSchema = GeneratedTestCaseSchema.openapi("TestCase");
export type TestCase = z.infer<typeof testCaseSchema>;
