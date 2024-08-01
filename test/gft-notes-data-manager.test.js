import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/gft-notes-data-manager/GftNotesDataManager.js';

describe('GftNotesDataManager', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should fetch notes and fire gft-notes-data-manager-get-success event', async () => {
    const el = await fixture(
      html`<gft-notes-data-manager .maxItems=${5}></gft-notes-data-manager>`
    );
    const spy = sinon.spy();
    el.addEventListener('gft-notes-data-manager-get-success', spy);

    await el._fetchNotes();

    assert.isTrue(spy.called);
    assert.isTrue(spy.getCall(0).args[0].detail.notes.length <= 5);
  });
});
