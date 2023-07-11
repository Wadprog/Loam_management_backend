import assert from 'assert';
import app from '../../src/app';

describe('\'previousAddress\' service', () => {
  it('registered the service', () => {
    const service = app.service('previous-address');

    assert.ok(service, 'Registered the service');
  });
});
