import assert from 'assert';
import app from '../../src/app';

describe('\'addressesUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('addresses-user');

    assert.ok(service, 'Registered the service');
  });
});
