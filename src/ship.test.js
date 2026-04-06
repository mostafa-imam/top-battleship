import { Ship } from "./ship.js";
import { expect, test, describe } from "@jest/globals";

describe("ship is sunk", () => {
  const ship = new Ship();
  ship.length(3);

  ship.hit();
  ship.hit();
  ship.hit();

  test("return true when hits no. === ship length ", () => {
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe("ship is not sunk", () => {
  const ship = new Ship();
  ship.length(3);

  ship.hit();
  ship.hit();

  test("return false when hits no. !== ship length ", () => {
    expect(ship.isSunk()).toBeFalsy();
  });
});
