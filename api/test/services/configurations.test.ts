import assert from 'assert';
import app from '../../src/app';

describe('\'configurations\' service', () => {
  it('registered the service', () => {
    const service = app.service('configurations');

    assert.ok(service, 'Registered the service');
  });
});
