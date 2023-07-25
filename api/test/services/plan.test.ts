import assert from 'assert';
import app from '../../src/app';

describe('\'plan\' service', () => {
  it('registered the service', () => {
    const service = app.service('plans');

    assert.ok(service, 'Registered the service');
  });
});
