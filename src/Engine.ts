type PlayerSelection = null | 'x' | 'o'

export class Engine {
  #gameStatus: PlayerSelection[][]

  constructor() {
    this.#gameStatus = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
  }

  board() {
    return this.#gameStatus
  }

  play(row: number, column: number) {
    if (row <= this.#gameStatus.length && column <= this.#gameStatus[row].length) {
      this.#gameStatus[row][column] = this.getActualRound() % 2 === 0 ? 'x' : 'o'
    }
  }

  getActualRound(): number {
    return this.#gameStatus.flat().filter(element => element !== null).length + 1
  }
}
