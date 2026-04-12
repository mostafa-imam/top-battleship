import { Ship } from "./ship.js";
export { Gameboard };

class Gameboard {
  #playerShips = [
    {
      coordinates: [
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 9],
        [10, 9],
      ],
      ship: new Ship(5),
      name: "carrier",
    },
    {
      coordinates: [
        [1, 7],
        [2, 7],
        [3, 7],
        [4, 7],
      ],
      ship: new Ship(4),
      name: "battleship",
    },
    {
      coordinates: [
        [3, 3],
        [4, 3],
        [5, 3],
      ],
      ship: new Ship(3),
      name: "cruiser",
    },
    {
      coordinates: [
        [8, 5],
        [9, 5],
        [10, 5],
      ],
      ship: new Ship(3),
      name: "submarine",
    },
    {
      coordinates: [
        [10, 2],
        [10, 3],
      ],
      ship: new Ship(2),
      name: "destroyer",
    },
  ];

  #computerShips = [
    {
      coordinates: [
        [9, 5],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
      ship: new Ship(5),
      name: "carrier",
    },
    {
      coordinates: [
        [5, 3],
        [6, 3],
        [7, 3],
        [8, 3],
      ],
      ship: new Ship(4),
      name: "battleship",
    },
    {
      coordinates: [
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      ship: new Ship(3),
      name: "cruiser",
    },
    {
      coordinates: [
        [4, 10],
        [5, 10],
        [6, 10],
      ],
      ship: new Ship(3),
    },
    {
      coordinates: [
        [2, 5],
        [3, 5],
      ],
      ship: new Ship(2),
      name: "destroyer",
    },
  ];

  #placement = null;

  get shipsPlacements() {
    return this.#placement;
  }

  set shipsPlacements(name) {
    if (typeof name !== "string") return;

    if (name !== "computer") {
      this.#placement = this.#playerShips;
      return;
    }

    this.#placement = this.#computerShips;
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
      if (item.ship.isSunk() === false) return false;
    }

    return true;
  }
}
