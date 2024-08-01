import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/gft-note/GftNote.js';

describe('GftNote', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should render a gft-checkbox and a note text', async () => {
    const note = { id: 1, title: 'Test Note' };
    const el = await fixture(html`<gft-note .note="${note}"></gft-note>`);

    const checkbox = el.shadowRoot.querySelector('gft-checkbox');
    const text = el.shadowRoot.querySelector('span');

    assert.isNotNull(checkbox);
    assert.equal(text.textContent, 'Test Note');
  });

  it('should fire gft-note-selection-change event when gft-checkbox changes', async () => {
    const note = { id: 1, title: 'Test Note' };
    const el = await fixture(html`<gft-note .note="${note}"></gft-note>`);

    const spy = sinon.spy();
    el.addEventListener('gft-note-selection-change', spy, { once: true });

    const checkbox = el.shadowRoot.querySelector('gft-checkbox');
    checkbox.dispatchEvent(
      new CustomEvent('gft-checkbox-change', {
        detail: { checked: true },
        bubbles: true,
        composed: true,
      })
    );

    assert.isTrue(spy.called);
    assert.deepEqual(spy.getCall(0).args[0].detail, { id: 1, selected: true });
  });
});
