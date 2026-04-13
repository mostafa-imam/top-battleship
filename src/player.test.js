import { Player } from "./player.js";
import { test, describe, expect } from "@jest/globals";

describe("Player constructor", () => {
  test("player name is returned correctly", () => {
    const player = new Player("John");

    expect(player.name).toBe("John");
  });

  test("player has its own gameboard", () => {
    const player = new Player("John");
    expect(player.gameboard).toBeDefined();
  });
});
