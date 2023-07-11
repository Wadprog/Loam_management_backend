import assert from 'assert';
import app from '../../src/app';

describe('\'states\' service', () => {
  it('registered the service', () => {
    const service = app.service('states');

    assert.ok(service, 'Registered the service');
  });
});
