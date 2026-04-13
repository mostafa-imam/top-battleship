import { populateComputerMove } from "./computer-logic.js";
import { describe, test, expect } from "@jest/globals";

describe("Computer To Attack", () => {
  const coordinates = populateComputerMove();

  test("x is greater than 0 and less than 11", () => {
    expect(coordinates[0]).toBeGreaterThan(0);
    expect(coordinates[0]).toBeLessThan(11);
  });

  test("y is greater than 0 and less than 11", () => {
    expect(coordinates[1]).toBeGreaterThan(0);
    expect(coordinates[1]).toBeLessThan(11);
  });
});
