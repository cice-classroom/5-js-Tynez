type PlayerMark = null | 'x' | 'o'

export class Engine {
  private readonly gameStatus: PlayerMark[][]
  private firstPlayerName: String = 'First player'
  private secondPlayerName: String = 'Second player'

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
    if (
      !this.checkVictory('o') &&
      !this.checkVictory('x') &&
      row < 3 &&
      column < 3 &&
      this.gameStatus[row][column] === null
    ) {
      this.gameStatus[row][column] = this.getNextPlayerMark()
    }
  }

  getTheWinner(): string {
    if (this.checkVictory('o')) {
      return `${this.firstPlayerName} is the winner`
    }

    if (this.checkVictory('x')) {
      return `${this.secondPlayerName} is the winner`
    }

    return `It's a draw!`
  }

  private getNextPlayerMark(): PlayerMark {
    return this.getFreeSpaces() % 2 === 0 ? 'x' : 'o'
  }

  private getFreeSpaces(): number {
    return this.gameStatus.flat().filter(element => element === null).length
  }

  private checkVictory(playerMark: PlayerMark): boolean {
    const validCombinations: PlayerMark[][] = [
      ...this.gameStatus,
      [this.gameStatus[0][0], this.gameStatus[1][0], this.gameStatus[2][0]],
      [this.gameStatus[0][1], this.gameStatus[1][1], this.gameStatus[2][1]],
      [this.gameStatus[0][2], this.gameStatus[1][2], this.gameStatus[2][2]],
      [this.gameStatus[0][0], this.gameStatus[1][1], this.gameStatus[2][2]],
      [this.gameStatus[0][2], this.gameStatus[1][1], this.gameStatus[2][0]],
    ]

    return validCombinations.filter(row => row.every(element => element === playerMark)).length > 0
  }
}
