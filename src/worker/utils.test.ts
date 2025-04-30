import { expect, test } from "vitest";
import { formatDate } from "./utils";

test("Formats March 14th, 2000 as 2000-03-14", () => {
  expect(formatDate(new Date(953035200000))).toBe("2000-03-14");
});
