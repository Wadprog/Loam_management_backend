import assert from 'assert';
import app from '../../src/app';

describe('\'instalments\' service', () => {
  it('registered the service', () => {
    const service = app.service('instalments');

    assert.ok(service, 'Registered the service');
  });
});
