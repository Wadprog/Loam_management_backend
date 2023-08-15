import assert from 'assert';
import app from '../../src/app';

describe('\'loan_plans\' service', () => {
  it('registered the service', () => {
    const service = app.service('loan-plans');

    assert.ok(service, 'Registered the service');
  });
});
