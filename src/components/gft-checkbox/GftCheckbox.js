import { LitElement, html } from 'lit';
import styles from './GftCheckbox-styles.js';

class GftCheckbox extends LitElement {
  static get styles() {
    return [styles];
  }

  static properties = {
    checked: { type: Boolean },
  };

  constructor() {
    super();
    this.checked = false;
  }

  render() {
    return html`
      <input
        type="checkbox"
        .checked="${this.checked}"
        @change="${this._handleChange}"
      />
    `;
  }

  _handleChange(event) {
    this.checked = event.target.checked;
    this.dispatchEvent(
      new CustomEvent('gft-checkbox-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('gft-checkbox', GftCheckbox);
