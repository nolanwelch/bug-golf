import { TestCase, TestCaseResult } from "../schema/kata.schema";

export function calculateScore(
  keystrokes: number,
  editDistance: number,
  timeTaken: number
): number {
  // Unweighted sum for now; will want to add weighting later
  return keystrokes + editDistance + timeTaken;
}

export function evaluateCode(
  code: string,
  testCases: Array<TestCase>
): Array<TestCaseResult> | null {
  const results: Array<TestCaseResult> = [];

  let userFunction: (...args: unknown[]) => unknown;

  try {
    // Create a function from the user code
    // (unsafe, but this is client-side)
    userFunction = new Function(`
      "use strict";
      ${code}
      return main;
      `)();
  } catch (err) {
    console.error("Failed to parse user code:", err);
    return null;
  }
  // Evaluate all test cases
  for (const testCase of testCases) {
    try {
      const actualOutput = userFunction(...testCase.args);
      results.push({
        pass: JSON.stringify(actualOutput) == JSON.stringify(testCase.expected),
        input: testCase.args,
        actualOutput,
        expectedOutput: testCase.expected,
      });
    } catch (err) {
      console.error("Runtime error on test case:", err);
      results.push({
        pass: false,
        input: testCase.args,
        actualOutput: err instanceof Error ? err.message : String(err),
        expectedOutput: testCase.expected,
      });
    }
  }

  return results;
}
