import assert from 'assert';
import app from '../../src/app';

describe('\'payments\' service', () => {
  it('registered the service', () => {
    const service = app.service('payments');

    assert.ok(service, 'Registered the service');
  });
});
