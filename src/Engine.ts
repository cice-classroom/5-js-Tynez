export class Engine {
  private gameStatus: PlayerToken[][]

  scoreBoard: {
    firstPlayer: number
    secondPlayer: number
    draw: number
  }

  constructor() {
    this.gameStatus = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
    this.scoreBoard = {
      firstPlayer: 0,
      secondPlayer: 0,
      draw: 0,
    }
  }

  board() {
    return this.gameStatus
  }

  play(row: number, column: number) {
    if (
      !this.isFirstPlayerTheWinner &&
      !this.isSecondPlayerTheWinner &&
      this.getFreeSpaces() > 0 &&
      row < 3 &&
      column < 3 &&
      this.gameStatus[row][column] === null
    ) {
      this.gameStatus[row][column] = this.getNextPlayerMark()
    }
    this.updateScore()
  }

  updateScore() {
    if (this.isFirstPlayerTheWinner) {
      this.scoreBoard.firstPlayer++
    }
    if (this.isSecondPlayerTheWinner) {
      this.scoreBoard.secondPlayer++
    }
    if (this.isDraw) {
      this.scoreBoard.draw++
    }
  }

  reset() {
    this.gameStatus = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
  }

  get isFirstPlayerTheWinner() {
    return this.checkVictory('o')
  }

  get isSecondPlayerTheWinner() {
    return this.checkVictory('x')
  }

  get isDraw() {
    return (
      !this.isFirstPlayerTheWinner && !this.isFirstPlayerTheWinner && this.getFreeSpaces() === 0
    )
  }

  private getNextPlayerMark(): PlayerToken {
    return this.getFreeSpaces() % 2 === 0 ? 'x' : 'o'
  }

  private getFreeSpaces(): number {
    return this.gameStatus.flat().filter(element => element === null).length
  }

  private checkVictory(playerMark: PlayerToken): boolean {
    const validCombinations: PlayerToken[][] = [
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
