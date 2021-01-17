import { customElement, LitElement, html, css, property } from 'lit-element'
import { Engine } from './Engine'
import type { Slot } from './tictactoe'

@customElement('app-tictactoe')
export class AppTictactoe extends LitElement {
  game = new Engine()

  @property()
  board = [...this.game.board()]

  @property()
  winnerLine: number[] = this.game.getWinnerLine

  static get styles() {
    return css`
      h1 {
        text-align: center;
      }
      #scoreboard {
        max-width: var(--container);
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
      }

      #toolbar {
        text-align: center;
        padding: var(--md-spacer) 0;
      }

      button {
        background-color: var(--background-color);
        color: var(--on-background-color);
        border: 3px solid var(--on-background-color);
        padding: 0.5rem 1.5rem;
        transition: all 0.2s ease-out;
        cursor: pointer;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: bold;
      }

      button:hover {
        background-color: var(--foreground-color);
        color: var(--on-foreground-color);
      }
    `
  }
  private play(event: CustomEvent<Slot>) {
    if (!this.game.isGameOver) {
      this.game.play(event.detail.position)
      this.board = [...this.game.board()]
      this.winnerLine = this.game.getWinnerLine
    }
  }

  private newGame() {
    this.game.reset()
    this.winnerLine = this.game.getWinnerLine
    this.board = [...this.game.board()]
  }

  render() {
    return html`
      <div>
        <h1>Tic Tac Toe</h1>
        <section id="scoreboard">
          <h3>Player 1: ${this.game.scoreBoard.firstPlayer}</h3>
          <h3>Player 2: ${this.game.scoreBoard.secondPlayer}</h3>
          <h3>Draws: ${this.game.scoreBoard.draw}</h3>
        </section>
        <app-board
          .board="${this.board}"
          .winnerLine="${this.winnerLine}"
          @on-choose-square="${this.play}"
        ></app-board>
        <section id="toolbar">
          <button @click="${() => this.newGame()}">Reset</button>
        </section>
      </div>
    `
  }
}
