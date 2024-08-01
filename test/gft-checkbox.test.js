import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/gft-checkbox/GftCheckbox.js';

describe('GftCheckbox', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should render a checkbox input', async () => {
    const el = await fixture(html`<gft-checkbox></gft-checkbox>`);
    const checkbox = el.shadowRoot.querySelector('input[type="checkbox"]');
    assert.isNotNull(checkbox);
  });

  it('should fire gft-checkbox-change event when checkbox changes', async () => {
    const el = await fixture(html`<gft-checkbox></gft-checkbox>`);
    const checkbox = el.shadowRoot.querySelector('input[type="checkbox"]');
    const spy = sinon.spy();
    el.addEventListener('gft-checkbox-change', spy);

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    assert.isTrue(spy.called);
    assert.deepEqual(spy.getCall(0).args[0].detail.checked, true);
  });
});
