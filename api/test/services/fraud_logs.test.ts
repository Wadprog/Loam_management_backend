import assert from 'assert';
import app from '../../src/app';

describe('\'fraud_logs\' service', () => {
  it('registered the service', () => {
    const service = app.service('fraud-logs');

    assert.ok(service, 'Registered the service');
  });
});
