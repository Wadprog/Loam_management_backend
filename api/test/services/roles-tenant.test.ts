import assert from 'assert';
import app from '../../src/app';

describe('\'rolesTenant\' service', () => {
  it('registered the service', () => {
    const service = app.service('roles-tenant');

    assert.ok(service, 'Registered the service');
  });
});
