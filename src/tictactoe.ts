import { customElement, LitElement, html, css } from 'lit-element'
import { Engine } from './Engine'

@customElement('app-tictactoe')
export class TicTacToe extends LitElement {
  game = new Engine()

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

  render() {
    return html`
      <div>
        <h1>Tic Tac Toe</h1>
        <h3>Player 1: 0</h3>
        <h3>Player 2: 0</h3>
        <h3>Draws: 0</h3>
        <div class="board">
          ${this.game
            .board()
            .flat()
            .map(
              (element, key) =>
                html` <app-tictactoe-square
                  row="${Math.floor(key / 3)}"
                  col="${key % 3}"
                  owner="${element}"
                ></app-tictactoe-square>`,
            )}
        </div>
      </div>
    `
  }
}
