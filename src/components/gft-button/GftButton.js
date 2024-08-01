import { LitElement, html } from 'lit';
import styles from './GftButton-styles.js';

class GftButton extends LitElement {
  static get styles() {
    return [styles];
  }

  static properties = {
    disabled: { type: Boolean },
  };

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`
      <button ?disabled="${this.disabled}" @click="${this._handleClick}">
        <slot></slot>
      </button>
    `;
  }

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent('gft-button-click', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('gft-button', GftButton);
