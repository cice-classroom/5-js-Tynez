import { customElement, LitElement, html, css, property } from 'lit-element'

@customElement('app-board')
export class Board extends LitElement {
  @property()
  board!: PlayerToken[][]

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
      <div class="board">
        ${this.board
          .flat()
          .map(
            (element, key) =>
              html`<app-board-square
                .owner="${element}"
                .position="${{ row: 2, column: key }}"
              ></app-board-square>`,
          )}
      </div>
    `
  }
}
