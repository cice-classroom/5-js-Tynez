import { customElement, LitElement, html, css } from 'lit-element'

@customElement('app-root')
export class AppRoot extends LitElement {
  static get styles() {
    return css``
  }

  render() {
    return html`<main>
      <app-tictactoe></app-tictactoe>
    </main>`
  }
}
