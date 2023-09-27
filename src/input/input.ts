import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('w7-dp-input')
export class OpenDatepickerInput extends LitElement {
  override render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w7-dp-input': OpenDatepickerInput;
  }
}
