type PlayerSelection = null | 'x' | 'o'

export class Engine {
  #game: PlayerSelection[][]

  constructor() {
    this.#game = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
  }

  board() {
    return this.#game
  }
}
