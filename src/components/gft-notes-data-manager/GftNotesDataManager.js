import { LitElement } from 'lit';

export class GftNotesDataManager extends LitElement {
  static properties = {
    maxItems: { type: Number },
  };

  constructor() {
    super();
    this.maxItems = 5;
  }

  async fetchNotes() {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_delay=1000&_=${Date.now()}`
    );
    const data = await response.json();
    const limitedData = data.slice(0, this.maxItems);

    this.dispatchEvent(
      new CustomEvent('gft-notes-data-manager-get-success', {
        bubbles: true,
        composed: true,
        detail: { notes: limitedData },
      })
    );
  }
}

customElements.define('gft-notes-data-manager', GftNotesDataManager);
