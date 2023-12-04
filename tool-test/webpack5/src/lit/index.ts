import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-lit-element')
export class MyLitElement extends LitElement {
  @property()
  accessor version = 'STARTING';

  render() {
    return html`
      <p>Welcome to the Lit tutorial!</p>
      <p>This is the ${this.version} code.</p>
    `;
  }
}
