export { Ship };

class Ship {
  constructor(num) {
    this.#length = num;
  }

  #length = null;

  #hits = 0;

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#length === this.#hits;
  }
}
