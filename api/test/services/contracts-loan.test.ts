import assert from 'assert';
import app from '../../src/app';

describe('\'contractsLoan\' service', () => {
  it('registered the service', () => {
    const service = app.service('contracts-loan');

    assert.ok(service, 'Registered the service');
  });
});
