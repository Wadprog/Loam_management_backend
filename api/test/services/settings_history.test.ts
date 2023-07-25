import assert from 'assert';
import app from '../../src/app';

describe('\'settings_history\' service', () => {
  it('registered the service', () => {
    const service = app.service('settings-history');

    assert.ok(service, 'Registered the service');
  });
});
