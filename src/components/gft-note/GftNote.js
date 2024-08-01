import { LitElement, html } from 'lit';
import styles from './GftNote-styles.js';

class GftNote extends LitElement {
  static get styles() {
    return [styles];
  }

  static properties = {
    note: { type: Object },
    selected: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.note = { id: 0, title: '' };
    this.selected = false;
  }

  render() {
    return html`
      <gft-checkbox
        .checked="${this.selected}"
        @gft-checkbox-change="${this._handleCheckboxChange}"
      ></gft-checkbox>
      <span>${this.note.title}</span>
    `;
  }

  _handleCheckboxChange(event) {
    this.selected = event.detail.checked;
    this.dispatchEvent(
      new CustomEvent('gft-note-selection-change', {
        bubbles: true,
        composed: true,
        detail: { id: this.note.id, selected: this.selected },
      })
    );
  }
}

customElements.define('gft-note', GftNote);
