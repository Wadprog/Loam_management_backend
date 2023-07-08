import assert from 'assert';
import app from '../../src/app';

describe('\'loan_requests\' service', () => {
  it('registered the service', () => {
    const service = app.service('loan-requests');

    assert.ok(service, 'Registered the service');
  });
});
