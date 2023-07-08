import assert from 'assert';
import app from '../../src/app';

describe('\'loan_reviews\' service', () => {
  it('registered the service', () => {
    const service = app.service('loan-reviews');

    assert.ok(service, 'Registered the service');
  });
});
