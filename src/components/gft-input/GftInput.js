import { LitElement, html } from 'lit';
import styles from './GftInput-styles.js';

class GftInput extends LitElement {
  static get styles() {
    return [styles];
  }

  static properties = {
    value: { type: String },
    placeholder: { type: String },
  };

  constructor() {
    super();
    this.value = '';
    this.placeholder = 'Add text';
  }

  render() {
    return html`
      <input
        type="text"
        .placeholder="${this.placeholder}"
        .value="${this.value}"
        @input="${this._handleInput}"
      />
    `;
  }

  _handleInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent('gft-input-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('gft-input', GftInput);
