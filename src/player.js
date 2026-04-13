import { Gameboard } from "./gameboard.js";
export { Player };

class Player {
  constructor(name) {
    this.name = name;
  }

  #board = new Gameboard();

  get gameboard() {
    return this.#board;
  }
}
