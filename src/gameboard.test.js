import { Gameboard } from "./gameboard.js";
import { describe, test, expect } from "@jest/globals";

describe("validity of attacks on ships", () => {
  test("valid attack", () => {
    const gameboard = new Gameboard();
    gameboard.shipsPlacements = "player";

    expect(gameboard.receiveAttack(3, 3)).toBeTruthy();
    expect(gameboard.receiveAttack(6, 9)).toBeTruthy();
    expect(gameboard.receiveAttack(10, 3)).toBeTruthy();
  });

  test("invalid attack", () => {
    const gameboard = new Gameboard();
    gameboard.shipsPlacements = "player";

    expect(gameboard.receiveAttack(1, 1)).toBeFalsy();
    expect(gameboard.receiveAttack(5, 9)).toBeFalsy();
    expect(gameboard.receiveAttack(7, 5)).toBeFalsy();
  });
});

describe("Ships sink status", () => {
  test("return true when all ships sink", () => {
    const gameboard = new Gameboard();
    gameboard.shipsPlacements = "player";

    /* carrier */
    gameboard.receiveAttack(6, 9);
    gameboard.receiveAttack(7, 9);
    gameboard.receiveAttack(8, 9);
    gameboard.receiveAttack(9, 9);
    gameboard.receiveAttack(10, 9);

    /* battleship */
    gameboard.receiveAttack(1, 7);
    gameboard.receiveAttack(2, 7);
    gameboard.receiveAttack(3, 7);
    gameboard.receiveAttack(4, 7);

    /* cruiser */
    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(4, 3);
    gameboard.receiveAttack(5, 3);

    /* submarine */
    gameboard.receiveAttack(8, 5);
    gameboard.receiveAttack(9, 5);
    gameboard.receiveAttack(10, 5);

    /* destroyer */
    gameboard.receiveAttack(10, 2);
    gameboard.receiveAttack(10, 3);

    expect(gameboard.isAllSunk()).toBeTruthy();
  });

  test("return false when not all ships sank", () => {
    const gameboard = new Gameboard();
    gameboard.shipsPlacements = "player";

    /* carrier */
    gameboard.receiveAttack(6, 9);
    gameboard.receiveAttack(7, 9);
    // gameboard.receiveAttack(8, 9)
    // gameboard.receiveAttack(9, 9)
    // gameboard.receiveAttack(10, 9)

    /* battleship */
    gameboard.receiveAttack(1, 7);
    // gameboard.receiveAttack(2, 7)
    // gameboard.receiveAttack(3, 7)
    // gameboard.receiveAttack(4, 7)

    /* cruiser */
    // gameboard.receiveAttack(3, 3)
    // gameboard.receiveAttack(4, 3)
    // gameboard.receiveAttack(5, 3)

    /* submarine */
    gameboard.receiveAttack(8, 5);
    // gameboard.receiveAttack(9, 5)
    gameboard.receiveAttack(10, 5);

    /* destroyer */
    gameboard.receiveAttack(10, 2);
    gameboard.receiveAttack(10, 3);

    expect(gameboard.isAllSunk()).toBeFalsy();
  });
});
