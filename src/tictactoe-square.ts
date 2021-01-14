import { css, customElement, html, LitElement, property } from 'lit-element'

type PlayerToken = null | 'x' | 'o'

@customElement('app-tictactoe-square')
export class TicTacToeSquare extends LitElement {
  @property()
  owner!: PlayerToken

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
    `
  }

  render() {
    return html`<div class="${this.owner}"></div>`
  }
}
