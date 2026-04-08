export { Player };
import { Gameboard } from "./gameboard.js";

class Player {
  constructor(name) {
    this.name = name;
  }

  #board = new Gameboard();

  get gameboard() {
    return this.#board;
  }
}
