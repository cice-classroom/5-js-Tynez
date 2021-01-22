import { customElement, LitElement, html, css } from 'lit-element'

@customElement('app-root')
export class AppRoot extends LitElement {
  static get styles() {
    return css`
      main {
        max-width: 700px;
        width: 100%;
        margin: 0 auto;
      }
    `
  }

  render() {
    return html`<main>
      <app-tictactoe></app-tictactoe>
    </main>`
  }
}
