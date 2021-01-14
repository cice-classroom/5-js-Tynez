import { css, customElement, html, LitElement, property } from 'lit-element'

@customElement('app-board-square')
export class BoardSquare extends LitElement {
  @property()
  owner!: PlayerToken

  @property()
  position!: { row: number; column: number }

  static get styles() {
    return css`
      div {
        background-color: #ddd;
      }
      div:after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      .player-o {
        background-color: red;
      }
      .player-x {
        background-color: green;
      }
    `
  }

  render() {
    return html`<div class="${this.owner ?? 'empty'}"></div>`
  }
}
