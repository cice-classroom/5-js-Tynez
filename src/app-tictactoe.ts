import { customElement, LitElement, html, css, property } from 'lit-element'
import { Engine } from './Engine'
import type { Slot } from './tictactoe'

@customElement('app-tictactoe')
export class AppTictactoe extends LitElement {
  game = new Engine()

  @property()
  board = [...this.game.board()]

  @property()
  winnerLine: number[] = []

  static get styles() {
    return css`
      .board {
        max-width: 500px;
        display: grid;
        grid-column: 3;
        grid-row: 3;
        grid-gap: 10px;
        grid-template-areas:
          'a b c'
          'd e f'
          'g h i';
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

  render() {
    return html`
      <div>
        <h1>Tic Tac Toe</h1>
        <h3>Player 1: ${this.game.scoreBoard.firstPlayer}</h3>
        <h3>Player 2: ${this.game.scoreBoard.secondPlayer}</h3>
        <h3>Draws: ${this.game.scoreBoard.draw}</h3>
        <app-board
          .board="${this.board}"
          .winnerLine="${this.winnerLine}"
          @on-choose-square="${this.play}"
        ></app-board>
        <button @click="${() => this.newGame()}">Reset</button>
      </div>
    `
  }
}
