import assert from 'assert';
import app from '../../src/app';

describe('\'borrowers\' service', () => {
  it('registered the service', () => {
    const service = app.service('borrowers');

    assert.ok(service, 'Registered the service');
  });
});
