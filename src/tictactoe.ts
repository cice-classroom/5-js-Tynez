import { customElement, LitElement, html, css } from 'lit-element'

@customElement('app-tictactoe')
export class TicTacToe extends LitElement {
  static get styles() {
    return css``
  }

  render() {
    return html`<h1>tac</h1>`
  }
}
