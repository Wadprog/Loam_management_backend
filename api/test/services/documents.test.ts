import assert from 'assert';
import app from '../../src/app';

describe('\'documents\' service', () => {
  it('registered the service', () => {
    const service = app.service('documents');

    assert.ok(service, 'Registered the service');
  });
});
