import { Ship } from "./ship.js";
export { Gameboard };

class Gameboard {
  #placement = this.#generateRandomShips();

  get shipsPlacements() {
    return this.#placement;
  }

  #missedHits = [];

  #validHits = [];

  receiveAttack(one, two) {
    if (typeof one !== "number") return false;
    if (typeof two !== "number") return false;

    for (let item of this.#validHits) {
      if (item[0] === one && item[1] === two) {
        return "invalid";
      }
    }

    for (let item of this.#missedHits) {
      if (item[0] === one && item[1] === two) {
        return "invalid";
      }
    }

    for (let ship of this.#placement) {
      for (let item of ship.coordinates) {
        if (one === item[0] && two === item[1]) {
          ship.ship.hit();
          this.#validHits.push([one, two]);
          return true;
        }
      }
    }

    this.#missedHits.push([one, two]);

    return false;
  }

  isAllSunk() {
    for (let item of this.#placement) {
      if (!item.ship.isSunk()) return false;
    }

    return true;
  }

  #generateRandomShips() {
    const allCoordinates = new Set();
    const ships = [];

    for (const length of [5, 4, 3, 3, 2]) {
      let shipObj;
      do {
        shipObj = this.#generateOneShip(length);
      } while (
        shipObj.coordinates.some((c) => allCoordinates.has(c.toString()))
      );

      shipObj.coordinates.forEach((c) => allCoordinates.add(c.toString()));
      ships.push(shipObj);
    }

    return ships;
  }

  #generateOneShip(length) {
    let output = {
      coordinates: [],
      ship: new Ship(length),
      position: this.#determinePosition(),
    };

    let startingPoint = this.#generateOneCoordinate();
    output.coordinates.push(startingPoint);

    let x = startingPoint[0];
    let y = startingPoint[1];

    if (output.position === "horizontal") {
      let newY = y;
      if (y + (length - 1) > 10) {
        for (let i = 0; i < length - 1; i++) {
          newY = newY - 1;
          output.coordinates.push([x, newY]);
        }
      } else {
        for (let i = 0; i < length - 1; i++) {
          newY = newY + 1;
          output.coordinates.push([x, newY]);
        }
      }
    }

    if (output.position === "vertical") {
      let newX = x;
      if (x + (length - 1) > 10) {
        for (let i = 0; i < length - 1; i++) {
          newX = newX - 1;
          output.coordinates.push([newX, y]);
        }
      } else {
        for (let i = 0; i < length - 1; i++) {
          newX = newX + 1;
          output.coordinates.push([newX, y]);
        }
      }
    }

    return output;
  }

  #generateOneCoordinate() {
    let x = Math.ceil(Math.random() * 10);
    let y = Math.ceil(Math.random() * 10);

    return [x, y];
  }

  #determinePosition() {
    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  placeShip(length, coordinates) {
    const ship = new Ship(length);

    this.#placement = [
      {
        ship,
        coordinates,
      },
    ];
  }
}
