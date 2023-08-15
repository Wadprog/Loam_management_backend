import assert from 'assert';
import app from '../../src/app';

describe('\'payment_intents \' service', () => {
  it('registered the service', () => {
    const service = app.service('payment-intents');

    assert.ok(service, 'Registered the service');
  });
});
