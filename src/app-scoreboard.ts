import { css, customElement, html, LitElement, property } from 'lit-element'
import type { ScoreBoard } from './tictactoe'

@customElement('app-scoreboard')
export class AppScoreboard extends LitElement {
  @property()
  actualScoreBoard!: ScoreBoard

  static get styles() {
    return css``
  }

  render() {
    return html`<div id="score-board">
      <h3>Player 1: ${this.actualScoreBoard.firstPlayer}</h3>
      <h3>Player 2: ${this.actualScoreBoard.secondPlayer}</h3>
      <h3>Draws: ${this.actualScoreBoard.draw}</h3>
    </div>`
  }
}
