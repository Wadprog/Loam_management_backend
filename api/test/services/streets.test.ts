import assert from 'assert';
import app from '../../src/app';

describe('\'streets\' service', () => {
  it('registered the service', () => {
    const service = app.service('streets');

    assert.ok(service, 'Registered the service');
  });
});
