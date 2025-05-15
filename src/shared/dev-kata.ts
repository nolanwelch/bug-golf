import { Kata } from "./api/schema/kata.schema";

export const DEV_KATA: Kata = {
  starterCode: `// Write a function that returns the sum of two numbers\nfunction main(a, b) {\n  return a - b;\n}`,
  description: "🎉 Dev mode: add two numbers",
  testCases: [
    { args: [1, 2], expected: 3 },
    { args: [-5, 5], expected: 0 },
    { args: [0, 0], expected: 0 },
    { args: [-3, -7], expected: -10 }, // adding two negatives
    { args: [1000, 2000], expected: 3000 }, // large positive numbers
    { args: [-1000, 500], expected: -500 }, // large negative plus positive
    { args: [0, 999], expected: 999 }, // zero + large positive
    { args: [123456789, 987654321], expected: 1111111110 }, // very large numbers
    { args: [-1, -1], expected: -2 }, // small negatives
    { args: [42, -42], expected: 0 }, // canceling out
  ],
};
