import assert from 'assert';
import app from '../../src/app';

describe('\'permitions\' service', () => {
  it('registered the service', () => {
    const service = app.service('permitions');

    assert.ok(service, 'Registered the service');
  });
});
