import assert from 'assert';
import app from '../../src/app';

describe('\'payment_methods\' service', () => {
  it('registered the service', () => {
    const service = app.service('payment-methods');

    assert.ok(service, 'Registered the service');
  });
});
