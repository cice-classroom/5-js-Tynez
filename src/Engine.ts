import type { PlayerToken } from './tictactoe'

export class Engine {
  private gameStatus: PlayerToken[]
  private winningCondition: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  scoreBoard: {
    firstPlayer: number
    secondPlayer: number
    draw: number
  }

  constructor() {
    this.gameStatus = [null, null, null, null, null, null, null, null, null]
    this.scoreBoard = {
      firstPlayer: 0,
      secondPlayer: 0,
      draw: 0,
    }
  }

  board(): PlayerToken[] {
    return this.gameStatus
  }

  play(position: number): void {
    const isValidPosition = position < this.gameStatus.length
    const isFreeSpace = this.gameStatus[position] === null
    if (!this.isGameOver && isValidPosition && isFreeSpace) {
      this.gameStatus[position] = this.getNextPlayerMark()
    }
    this.updateScore()
  }

  updateScore(): void {
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

  reset(): void {
    this.gameStatus = [null, null, null, null, null, null, null, null, null]
  }

  get isFirstPlayerTheWinner(): boolean {
    return this.checkVictory('o').length > 0
  }

  get isSecondPlayerTheWinner(): boolean {
    return this.checkVictory('x').length > 0
  }

  get isDraw(): boolean {
    return (
      !this.isFirstPlayerTheWinner && !this.isFirstPlayerTheWinner && this.getFreeSpaces() === 0
    )
  }

  get isGameOver(): boolean {
    return this.isFirstPlayerTheWinner || this.isSecondPlayerTheWinner || this.isDraw
  }

  get getWinnerLine(): number[] {
    if (this.isFirstPlayerTheWinner) {
      return this.checkVictory('o')[0]
    }
    if (this.isSecondPlayerTheWinner) {
      return this.checkVictory('x')[0]
    }
    return []
  }

  private getNextPlayerMark(): PlayerToken {
    return this.getFreeSpaces() % 2 === 0 ? 'x' : 'o'
  }

  private getFreeSpaces(): number {
    return this.gameStatus.filter(element => element === null).length
  }

  private checkVictory(playerMark: PlayerToken): number[][] {
    const winnerCombinations = this.winningCondition.filter(row =>
      row.every(element => this.gameStatus[element] === playerMark),
    )
    return winnerCombinations
  }
}
