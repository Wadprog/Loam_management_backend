import assert from 'assert';
import app from '../../src/app';

describe('\'colateral\' service', () => {
  it('registered the service', () => {
    const service = app.service('colaterals');

    assert.ok(service, 'Registered the service');
  });
});
