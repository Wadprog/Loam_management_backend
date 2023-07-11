import assert from 'assert';
import app from '../../src/app';

describe('\'addressBorrower\' service', () => {
  it('registered the service', () => {
    const service = app.service('address-borrower');

    assert.ok(service, 'Registered the service');
  });
});
