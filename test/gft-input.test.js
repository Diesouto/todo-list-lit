import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/gft-input/GftInput.js';

describe('GftInput', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should render an input element', async () => {
    const el = await fixture(html`<gft-input></gft-input>`);
    const input = el.shadowRoot.querySelector('input');
    assert.isNotNull(input);
  });

  it('should fire gft-input-change event when input changes', async () => {
    const el = await fixture(html`<gft-input></gft-input>`);
    const input = el.shadowRoot.querySelector('input');
    const spy = sinon.spy();
    el.addEventListener('gft-input-change', spy);

    input.value = 'Test Note';
    input.dispatchEvent(new Event('input'));

    assert.isTrue(spy.called);
    assert.deepEqual(spy.getCall(0).args[0].detail.value, 'Test Note');
  });
});
