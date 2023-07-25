import assert from 'assert';
import app from '../../src/app';

describe('\'settings_tenant\' service', () => {
  it('registered the service', () => {
    const service = app.service('settings-tenant');

    assert.ok(service, 'Registered the service');
  });
});
