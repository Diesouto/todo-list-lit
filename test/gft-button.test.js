import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/gft-button/GftButton.js';

describe('GftButton', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should render a button element', async () => {
    const el = await fixture(html`<gft-button></gft-button>`);
    const button = el.shadowRoot.querySelector('button');
    assert.isNotNull(button);
  });

  it('should fire gft-button-click event when button is clicked', async () => {
    const el = await fixture(html`<gft-button></gft-button>`);
    const button = el.shadowRoot.querySelector('button');
    const spy = sinon.spy();
    el.addEventListener('gft-button-click', spy);

    button.click();

    assert.isTrue(spy.called);
  });
});
