import assert from 'assert';
import app from '../../src/app';

describe('\'alteredAddressNotification\' service', () => {
  it('registered the service', () => {
    const service = app.service('altered-address-notification');

    assert.ok(service, 'Registered the service');
  });
});
