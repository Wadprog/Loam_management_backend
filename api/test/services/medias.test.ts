import assert from 'assert';
import app from '../../src/app';

describe('\'medias\' service', () => {
  it('registered the service', () => {
    const service = app.service('medias');

    assert.ok(service, 'Registered the service');
  });
});
