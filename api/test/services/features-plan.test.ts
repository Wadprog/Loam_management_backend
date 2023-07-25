import assert from 'assert';
import app from '../../src/app';

describe('\'features-plan\' service', () => {
  it('registered the service', () => {
    const service = app.service('features-plan');

    assert.ok(service, 'Registered the service');
  });
});
