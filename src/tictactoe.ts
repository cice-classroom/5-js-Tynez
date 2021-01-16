import { customElement, LitElement, html, css, property } from 'lit-element'
import { Engine } from './Engine'
import type { Movement } from './types'

@customElement('app-tictactoe')
export class TicTacToe extends LitElement {
  game = new Engine()

  @property()
  board = [...this.game.board()]

  static get styles() {
    return css`
      .board {
        max-width: 500px;
        display: grid;
        grid-columns: 3;
        grid-rows: 3;
        grid-gap: 10px;
        grid-template-areas:
          'a b c'
          'd e f'
          'g h i';
      }
    `
  }
  private play(event: CustomEvent<Movement>) {
    const isGameNotEnded =
      !this.game.isFirstPlayerTheWinner && !this.game.isSecondPlayerTheWinner && !this.game.isDraw

    if (isGameNotEnded) {
      this.game.play(event.detail.row, event.detail.column)
      this.board = [...this.game.board()]
    }
  }

  private newGame() {
    this.game.reset()
    this.board = [...this.game.board()]
  }

  render() {
    return html`
      <div>
        <h1>Tic Tac Toe</h1>
        <h3>Player 1: ${this.game.scoreBoard.firstPlayer}</h3>
        <h3>Player 2: ${this.game.scoreBoard.secondPlayer}</h3>
        <h3>Draws: ${this.game.scoreBoard.draw}</h3>
        <app-board .board="${this.board}" @on-choose-square="${this.play}"></app-board>
        <button @click="${() => this.newGame()}">Reset</button>
      </div>
    `
  }
}
