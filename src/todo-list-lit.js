import { LitElement, html } from 'lit';
import styles from './todo-list-lit-styles.js';
import './components/gft-button/GftButton.js';
import './components/gft-checkbox/GftCheckbox.js';
import './components/gft-input/GftInput.js';
import './components/gft-note/GftNote.js';
import './components/gft-notes-data-manager/GftNotesDataManager.js';

class TodoListLit extends LitElement {
  static get properties() {
    return {
      notes: { type: Array },
      loading: { type: Boolean },
      newNoteText: { type: String },
      selectedNotes: { type: Set },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.notes = [];
    this.loading = false;
    this.newNoteText = '';
    this.selectedNotes = new Set();
  }

  firstUpdated() {
    this._fetchNotes();
  }

  async _fetchNotes() {
    this.loading = true;

    const dataManager = this.shadowRoot.querySelector('gft-notes-data-manager');
    if (dataManager) {
      await dataManager.fetchNotes();
    }
  }

  headerTemplate() {
    return html` <header>
      <gft-input
        .value="${this.newNoteText}"
        placeholder="Add new note"
        @gft-input-change="${this._handleInputChange}"
      ></gft-input>
      <div class="btnGroup">
        <gft-button
          ?disabled="${!this.newNoteText}"
          class="primary"
          @gft-button-click="${this._addNote}"
          >Add Note</gft-button
        >
        <gft-button
          ?disabled="${this.selectedNotes.size === 0}"
          class="danger"
          @gft-button-click="${this._deleteSelectedNotes}"
          >Delete Selected Notes</gft-button
        >
      </div>
    </header>`;
  }

  emptyTemplate() {
    return this.notes.length === 0
      ? html`<span class="no-notes">No notes available</span>`
      : '';
  }

  notesTemplate() {
    return html`
      <gft-notes-data-manager
        .maxItems="${5}"
        @gft-notes-data-manager-get-success="${this._handleNotesLoaded}"
      ></gft-notes-data-manager>

      <div class="note-container">
        ${this.notes.map(
          note => html`
            <gft-note
              .note="${note}"
              @gft-note-selection-change="${this._handleNoteSelectionChange}"
            ></gft-note>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      ${this.headerTemplate()}

      <main>
        ${this.loading
          ? html`<span class="loading">Loading...</span>`
          : this.emptyTemplate()}
        ${this.notesTemplate()}
      </main>
    `;
  }

  _handleNotesLoaded(event) {
    this.notes = event.detail.notes;
    this.loading = false;
  }

  _handleInputChange(event) {
    this.newNoteText = event.detail.value.trim();
  }

  _handleNoteSelectionChange(event) {
    if (event.detail.selected) {
      this.selectedNotes.add(event.detail.id);
    } else {
      this.selectedNotes.delete(event.detail.id);
    }
    this.requestUpdate();
  }

  _addNote() {
    const newNote = { id: Date.now(), title: this.newNoteText };
    this.notes = [...this.notes, newNote];
    this.newNoteText = '';
  }

  _deleteSelectedNotes() {
    this.notes = this.notes.filter(note => !this.selectedNotes.has(note.id));
    this.selectedNotes.clear();
    this._uncheckAllNotes();
  }

  _uncheckAllNotes() {
    this.shadowRoot.querySelectorAll('gft-note').forEach(element => {
      const note = element;
      note.selected = false;
    });
  }
}

customElements.define('todo-list-lit', TodoListLit);
