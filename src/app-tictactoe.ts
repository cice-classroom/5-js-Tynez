import { customElement, LitElement, html, css, property } from 'lit-element'
import { Engine } from './Engine'
import type { Slot } from './tictactoe'

@customElement('app-tictactoe')
export class AppTictactoe extends LitElement {
  game = new Engine()

  @property()
  board = [...this.game.board()]

  @property()
  actualWinner = {
    firstPlayer: this.game.isFirstPlayerTheWinner,
    secondPlayer: this.game.isSecondPlayerTheWinner,
  }

  @property()
  winnerLine: number[] = this.game.getWinnerLine

  static get styles() {
    return css`
      h1 {
        text-align: center;
      }

      #toolbar {
        text-align: center;
        padding: var(--md-spacer) 0;
      }
    `
  }
  private play(event: CustomEvent<Slot>) {
    if (!this.game.isGameOver) {
      this.game.play(event.detail.position)
      this.board = [...this.game.board()]
      this.winnerLine = this.game.getWinnerLine
    }
  }

  private newGame() {
    this.game.reset()
    this.winnerLine = this.game.getWinnerLine
    this.board = [...this.game.board()]
  }

  private winnerMessage() {
    if (this.game.isFirstPlayerTheWinner) {
      return 'First player wins!'
    }
    if (this.game.isSecondPlayerTheWinner) {
      return 'Second player wins!'
    }
    return 'It is a draw!'
  }

  render() {
    return html`
      <div>
        <h1>Tic Tac Toe</h1>
        <app-scoreboard .actualScoreBoard="${{ ...this.game.scoreBoard }}"></app-scoreboard>
        <app-board
          .board="${this.board}"
          .winnerLine="${this.winnerLine}"
          @on-choose-square="${this.play}"
        ></app-board>
        <app-game-over
          .isGameOver="${this.game.isGameOver}"
          .message="${this.winnerMessage()}"
          @on-new-game="${() => this.newGame()}"
        ></app-game-over>
      </div>
    `
  }
}
