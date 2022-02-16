import { BeforeDenormalizeEvent } from './before-denormalize.event';

describe('BeforeDenormalizeEvent', () => {

  it('should build before denormalize event with data', () => {
    const event: BeforeDenormalizeEvent = new BeforeDenormalizeEvent({
      type: BeforeDenormalizeEvent,
      body: {
        field: 'My body field'
      }
    });

    expect(event.body.field).toEqual('My body field');
  });
});
