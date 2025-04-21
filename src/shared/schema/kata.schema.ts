import { z } from "@hono/zod-openapi";

// Test case schema
export const testCaseSchema = z
  .object({
    args: z.array(z.any()),
    expected: z.any(),
  })
  .openapi("TestCase");
export type TestCase = z.infer<typeof testCaseSchema>;

// Kata schema
export const kataSchema = z
  .object({
    starterCode: z.string().nonempty(),
    testCases: z.array(testCaseSchema),
    description: z.string().optional(),
  })
  .openapi("Kata");
export type Kata = z.infer<typeof kataSchema>;

// Solution schema
export const solutionSchema = z
  .object({ code: z.string().nonempty() })
  .openapi("Solution");
export type Solution = z.infer<typeof solutionSchema>;
