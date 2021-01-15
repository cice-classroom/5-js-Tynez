import { css, customElement, html, LitElement, property } from 'lit-element'
import type { Movement, PlayerToken } from './types'

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

  chooseSquare() {
    const customEvent = new CustomEvent<Movement>('on-choose-square', {
      bubbles: true,
      composed: true,
      detail: {
        row: this.position.row,
        column: this.position.column,
      },
    })

    this.dispatchEvent(customEvent)
  }

  render() {
    return html`<div
      @click="${() => {
        this.chooseSquare()
      }}"
      class="${this.owner ?? 'empty'}"
    ></div>`
  }
}
