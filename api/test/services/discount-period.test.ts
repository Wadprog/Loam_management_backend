import assert from 'assert';
import app from '../../src/app';

describe('\'discount_period \' service', () => {
  it('registered the service', () => {
    const service = app.service('discount-period');

    assert.ok(service, 'Registered the service');
  });
});
