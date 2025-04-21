import { Kata } from "./schema/kata.schema";

export const DEV_KATA: Kata = {
  starterCode: `// Write a function that returns the sum of two numbers\nfunction add(a, b) {\n  return a - b;\n}`,
  description: "🎉 Dev mode: add two numbers",
  testCases: [
    { args: [1, 2], expected: 3 },
    { args: [-5, 5], expected: 0 },
    { args: [0, 0], expected: 0 },
  ],
};
