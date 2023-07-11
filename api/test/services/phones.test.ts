import assert from 'assert';
import app from '../../src/app';

describe('\'phones \' service', () => {
  it('registered the service', () => {
    const service = app.service('phones');

    assert.ok(service, 'Registered the service');
  });
});
