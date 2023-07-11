import assert from 'assert';
import app from '../../src/app';

describe('\'phoneTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('phone-types');

    assert.ok(service, 'Registered the service');
  });
});
