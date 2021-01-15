import { customElement, LitElement, html, css, property } from 'lit-element'
import type { PlayerToken, Movement } from './types'

@customElement('app-board')
export class Board extends LitElement {
  @property()
  board: PlayerToken[][] = []

  @property()
  flag!: number

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
      .board > div {
        background-color: #ddd;
      }
      .board > div:after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      .board > div.o {
        background-color: red;
      }
      .board > div.x {
        background-color: green;
      }
    `
  }

  private chooseMovement(row: number, column: number) {
    const customEvent = new CustomEvent<Movement>('on-choose-square', {
      bubbles: true,
      composed: true,
      detail: {
        row: row,
        column: column,
      },
    })

    this.dispatchEvent(customEvent)
  }

  render() {
    return html`
      <div class="board">
        ${this.board
          .flat()
          .map(
            (element, key) =>
              html` <div
                class="${element ?? 'empty'}"
                @click="${() => this.chooseMovement(Math.floor(key / 3), key % 3)}"
              ></div>`,
          )}
      </div>
    `
  }
}
