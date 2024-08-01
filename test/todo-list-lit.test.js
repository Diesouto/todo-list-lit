import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import mocks from './mocks.js';
import '../src/todo-list-lit.js';
import { GftNotesDataManager } from '../src/components/gft-notes-data-manager/GftNotesDataManager.js';

describe('TodoListLit', () => {
  let el;
  let elShadowRoot;

  afterEach(() => {
    sinon.restore();
    fixtureCleanup();
  });

  beforeEach(async () => {
    sinon
      .stub(GftNotesDataManager.prototype, '_fetchNotes')
      .callsFake(function () {
        this.dispatchEvent(
          new CustomEvent('gft-notes-data-manager-get-success', {
            bubbles: true,
            composed: true,
            detail: { notes: mocks.notes },
          })
        );
      });

    el = await fixture(html`<todo-list-lit></todo-list-lit>`);
    elShadowRoot = el.shadowRoot;
    await el.updateComplete;
  });

  it('should render the initial structure', async () => {
    assert.isNotNull(elShadowRoot.querySelector('gft-notes-data-manager'));
    assert.isNotNull(elShadowRoot.querySelector('gft-input'));
    assert.isNotNull(elShadowRoot.querySelector('gft-button[class="primary"]'));
    assert.isNotNull(elShadowRoot.querySelector('gft-button[class="danger"]'));
    assert.isNotNull(elShadowRoot.querySelector('gft-note'));
  });

  it('should load and display notes', async () => {
    const notes = elShadowRoot.querySelectorAll('gft-note');
    assert.equal(notes.length, mocks.notes.length);
  });

  it('should show loading indicator when loading', async () => {
    el.loading = true;
    await el.updateComplete;
    const loadingEl = elShadowRoot.querySelector('.loading');
    assert.isNotNull(loadingEl);
    assert.equal(loadingEl.textContent, 'Loading...');
  });

  it('should show no notes available message when there are no notes', async () => {
    el.notes = [];
    await el.updateComplete;
    const noNotesEl = elShadowRoot.querySelector('.no-notes');
    assert.isNotNull(noNotesEl);
    assert.equal(noNotesEl.textContent, 'No notes available');
  });
});
