import { customElement, LitElement, html, css, property } from 'lit-element'

@customElement('app-game-over')
export class AppGameOver extends LitElement {
  @property()
  isGameOver!: boolean

  @property()
  message!: string

  static get styles() {
    return css`
      #game-over-message {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .game-over-message--content {
        background-color: rgba(255, 255, 255, 0.8);
        text-align: center;
        width: 100%;
        padding: 2rem 0 4rem;
        box-shadow: var(--shadow);
        opacity: 0;
        visibility: hidden;
        animation: game-over-show 0.2s ease-out forwards;
      }

      @keyframes game-over-show {
        from {
          opacity: 0;
          visibility: hidden;
        }
        to {
          opacity: 1;
          visibility: visible;
        }
      }

      .game-over-message--content > h1 {
        font-size: 3rem;
        margin-bottom: 0;
      }

      .game-over-message--content > h2 {
        margin-top: 0.5rem;
      }

      button {
        background-color: transparent;
        color: var(--on-background-color);
        border: 3px solid var(--on-background-color);
        padding: 0.5rem 1.5rem;
        margin: 1rem 0;
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

  private resetGame() {
    const customEvent = new CustomEvent<void>('on-new-game', {
      bubbles: true,
      composed: true,
    })

    this.dispatchEvent(customEvent)
  }

  render() {
    if (this.isGameOver) {
      return html`
        <div id="game-over-message">
          <div class="game-over-message--content">
            <h1>Game Over</h1>
            <h2>${this.message}</h2>
            <section id="toolbar">
              <button @click="${() => this.resetGame()}">Play again</button>
            </section>
          </div>
        </div>
      `
    }
    return html``
  }
}
