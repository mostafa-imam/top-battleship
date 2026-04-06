export { Ship };

class Ship {
  #length = null;

  length(num) {
    this.#length = num;
  }

  #hits = 0;

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#length === this.#hits;
  }
}
