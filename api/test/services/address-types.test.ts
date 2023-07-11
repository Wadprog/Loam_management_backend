import assert from 'assert';
import app from '../../src/app';

describe('\'addressTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('address-types');

    assert.ok(service, 'Registered the service');
  });
});
