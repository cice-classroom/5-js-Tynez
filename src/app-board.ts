import { customElement, LitElement, html, css, property } from 'lit-element'
import type { PlayerToken, Slot } from './tictactoe'
import { classMap } from 'lit-html/directives/class-map'

@customElement('app-board')
export class AppBoard extends LitElement {
  @property()
  board: PlayerToken[] = []

  @property()
  flag!: number

  @property()
  winnerLine!: number[]

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

      .board > .first-player-token {
        background-color: red;
      }

      .board > .second-player-token {
        background-color: green;
      }

      .board.game-over > div:not(.winner) {
        opacity: 0.3;
      }
    `
  }

  private chooseSlot(position: number) {
    const customEvent = new CustomEvent<Slot>('on-choose-square', {
      bubbles: true,
      composed: true,
      detail: {
        position: position,
      },
    })

    this.dispatchEvent(customEvent)
  }

  render() {
    return html`
      <div class="board ${classMap({ ['game-over']: this.winnerLine.length > 0 })}">
        ${this.board.map(
          (element, key) =>
            html` <div
              class="${classMap({
                ['first-player-token']: element === 'o',
                ['second-player-token']: element === 'x',
                ['winner']: this.winnerLine.includes(key),
              })}"
              @click="${() => this.chooseSlot(key)}"
            ></div>`,
        )}
      </div>
    `
  }
}
