import assert from 'assert';
import app from '../../src/app';

describe('\'borrowers_organization\' service', () => {
  it('registered the service', () => {
    const service = app.service('borrowers_organization');

    assert.ok(service, 'Registered the service');
  });
});
