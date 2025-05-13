import {
  KataSchema as GeneratedKataSchema,
  SubmissionSchema as GeneratedSubmissionSchema,
  TestCaseSchema as GeneratedTestCaseSchema,
} from "@/generated/zod";
import { z } from "@hono/zod-openapi";

// Kata
export const kataSchema = GeneratedKataSchema.openapi("Kata");
export type Kata = z.infer<typeof kataSchema>;

// TestCase
export const testCaseSchema = GeneratedTestCaseSchema.openapi("TestCase");
export type TestCase = z.infer<typeof testCaseSchema>;

// Submission
export const submissionSchema = GeneratedSubmissionSchema.openapi("Submission");
export type Submission = z.infer<typeof submissionSchema>;
