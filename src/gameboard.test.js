import { Gameboard } from "./gameboard.js";
import { describe, test, expect } from "@jest/globals";

describe("validity of attacks on ships", () => {
  test("valid attack", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(3, [
      [3, 3],
      [3, 4],
      [3, 5],
    ]);

    expect(gameboard.receiveAttack(3, 3)).toBeTruthy();
    expect(gameboard.receiveAttack(3, 4)).toBeTruthy();
    expect(gameboard.receiveAttack(3, 5)).toBeTruthy();
  });

  test("invalid attack", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(2, [
      [1, 1],
      [1, 2],
    ]);

    expect(gameboard.receiveAttack(1, 5)).toBeFalsy();
    expect(gameboard.receiveAttack(1, 3)).toBeFalsy();
  });
});

describe("Ships sink status", () => {
  test("return true when all ships sink", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(2, [
      [1, 1],
      [1, 2],
    ]);

    console.log(gameboard.shipsPlacements);

    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(1, 2);

    expect(gameboard.isAllSunk()).toBeTruthy();
  });

  test("return false when not all ships sank", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(2, [
      [1, 1],
      [1, 2],
    ]);

    gameboard.receiveAttack(1, 1);
    // gameboard.receiveAttack(1, 2);

    expect(gameboard.isAllSunk()).toBeFalsy();
  });
});
