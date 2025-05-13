import { PrismaClient } from "../src/generated/prisma";

const DEV_KATA = {
  starterCode: `// Write a function that returns the sum of two numbers\nfunction main(a, b) {\n  return a - b;\n}`,
  description: "🎉 Dev mode: add two numbers",
  testCases: [
    { args: "[1, 2]", expected: "3" },
    { args: "[-5, 5]", expected: "0" },
    { args: "[0, 0]", expected: "0" },
    { args: "[-3, -7]", expected: "-10" },
    { args: "[1000, 2000]", expected: "3000" },
    { args: "[-1000, 500]", expected: "-500" },
    { args: "[0, 999]", expected: "999" },
    { args: "[123456789, 987654321]", expected: "1111111110" },
    { args: "[-1, -1]", expected: "-2" },
    { args: "[42, -42]", expected: "0" },
  ],
};

async function main() {
  const prisma = new PrismaClient();
  
  try {
    // Clean up existing data
    console.log("Cleaning up existing data...");
    await prisma.testCase.deleteMany({});
    await prisma.kata.deleteMany({});
    await prisma.user.deleteMany({});

    // Create a test user
    console.log("Creating test user...");
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
      },
    });

    // Create a sample kata using DEV_KATA
    console.log("Creating sample kata...");
    const kata = await prisma.kata.create({
      data: {
        date: new Date(),
        starterCode: DEV_KATA.starterCode,
        description: DEV_KATA.description,
        userId: user.id,
      },
    });

    // Add test cases from DEV_KATA
    console.log("Adding test cases...");
    await prisma.testCase.createMany({
      data: DEV_KATA.testCases.map((testCase) => ({
        ...testCase,
        kataId: kata.id,
      })),
    });

    console.log("Database seeded successfully with DEV_KATA!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
