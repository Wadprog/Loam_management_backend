import assert from 'assert';
import app from '../../src/app';

describe('\'phonesUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('phones-user');

    assert.ok(service, 'Registered the service');
  });
});
