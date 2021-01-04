type PlayerMark = null | 'x' | 'o'

export class Engine {
  private gameStatus: PlayerMark[][]

  constructor() {
    this.gameStatus = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
  }

  board() {
    return this.gameStatus
  }

  play(row: number, column: number) {
    if (row < 3 && column < 3 && this.gameStatus[row][column] === null) {
      this.gameStatus[row][column] = this.getNextPlayerMark()
    }
  }

  private getNextPlayerMark(): PlayerMark {
    return this.getFreeSpaces() % 2 === 0 ? 'x' : 'o'
  }

  private getFreeSpaces(): number {
    return this.gameStatus.flat().filter(element => element === null).length
  }
}
