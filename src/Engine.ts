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
      let round = this.getActualRound()
      this.#gameStatus[row][column] = round % 2 === 0 ? 'o' : 'x'
    }
  }

  getActualRound(): number {
    return this.#gameStatus.flat().filter(element => element !== null).length
  }
}
