import assert from 'assert';
import app from '../../src/app';

describe('\'loans\' service', () => {
  it('registered the service', () => {
    const service = app.service('loans');

    assert.ok(service, 'Registered the service');
  });
});
