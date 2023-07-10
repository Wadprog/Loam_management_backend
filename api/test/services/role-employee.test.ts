import assert from 'assert';
import app from '../../src/app';

describe('\'roleEmployee\' service', () => {
  it('registered the service', () => {
    const service = app.service('role-employee');

    assert.ok(service, 'Registered the service');
  });
});
