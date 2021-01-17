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
      #board {
        max-width: var(--container);
        margin: 0 auto;
        position: relative;
        display: grid;
        grid-column: 3;
        grid-row: 3;
        grid-gap: 10px;
        grid-template-areas:
          'a b c'
          'd e f'
          'g h i';
        overflow: hidden;
      }

      #board::after {
        content: '';
        background-color: var(--foreground-color);
        border-radius: var(-circle);
        position: absolute;
        width: 30%;
        height: 30%;
        top: 50%;
        left: 50%;
        margin-left: -15%;
        margin-top: -15%;
        animation: board-animation 0.8s ease-out forwards;
        animation-delay: 0.3s;
      }

      @keyframes board-animation {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(4);
        }
      }

      #board > div {
        background-color: var(--background-color);
        position: relative;
        z-index: 10;
      }

      #board > div:after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }

      #board > .board--first-player-token .token,
      #board > .board--second-player-token .token {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
      }

      #board > .board--first-player-token .token::after,
      #board > .board--first-player-token .token::before {
        content: '';
        position: absolute;
        border-radius: var(-circle);
        background-color: var(--foreground-color);
        transition: all 0.2s ease-out;
      }

      #board > .board--first-player-token .token::after {
        width: 70%;
        height: 70%;
        background-color: var(--foreground-color);
        z-index: 14;
      }

      #board > .board--first-player-token .token::before {
        width: 60%;
        height: 60%;
        background-color: var(--background-color);
        z-index: 15;
        animation: first-player-token-animation 0.2s ease-out forwards;
      }

      @keyframes first-player-token-animation {
        from {
          transform: scale(1.2);
        }
        to {
          transform: scale(1);
        }
      }

      #board > .board--second-player-token .token::after,
      #board > .board--second-player-token .token::before {
        content: '';
        width: 80%;
        height: 5%;
        position: absolute;
        background-color: var(--foreground-color);
        transition: all 0.2s ease-out;
      }

      #board > .board--second-player-token .token::after {
        animation: second-player-token-rotation-right 0.2s ease-out forwards;
      }

      #board > .board--second-player-token .token::before {
        animation: second-player-token-rotation-left 0.2s ease-out forwards;
      }

      @keyframes second-player-token-rotation-right {
        from {
          transform: scale(0);
          transform: rotate(0deg);
        }
        to {
          transform: scale(1);
          transform: rotate(45deg);
        }
      }

      @keyframes second-player-token-rotation-left {
        from {
          transform: scale(0);
          transform: rotate(0deg);
        }
        to {
          transform: scale(1);
          transform: rotate(-45deg);
        }
      }

      #board.game-over > .board--first-player-token:not(.board--winner-token) .token::after,
      #board.game-over > .board--second-player-token:not(.board--winner-token) .token::after,
      #board.game-over > .board--second-player-token:not(.board--winner-token) .token::before {
        background-color: var(--disabled-color);
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
      <section id="board" class="${classMap({ ['game-over']: this.winnerLine.length > 0 })}">
        ${this.board.map(
          (element, key) =>
            html` <div
              class="${classMap({
                ['board--first-player-token']: element === 'o',
                ['board--second-player-token']: element === 'x',
                ['board--winner-token']: this.winnerLine.includes(key),
              })}"
              @click="${() => this.chooseSlot(key)}"
            >
              <div class="token"></div>
            </div>`,
        )}
      </section>
    `
  }
}
