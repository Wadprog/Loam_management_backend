import assert from 'assert';
import app from '../../src/app';

describe('\'discounts \' service', () => {
  it('registered the service', () => {
    const service = app.service('discounts');

    assert.ok(service, 'Registered the service');
  });
});
