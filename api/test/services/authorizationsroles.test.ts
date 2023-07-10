import assert from 'assert';
import app from '../../src/app';

describe('\'authorizationsroles\' service', () => {
  it('registered the service', () => {
    const service = app.service('authorizationsroles');

    assert.ok(service, 'Registered the service');
  });
});
