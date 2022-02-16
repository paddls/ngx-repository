import { AfterDenormalizeEvent } from './after-denormalize.event';

describe('AfterDenormalizeEvent', () => {

  it('should build after denormalize event with data', () => {
    const event: AfterDenormalizeEvent = new AfterDenormalizeEvent({
      type: AfterDenormalizeEvent,
      body: {
        field: 'My body field'
      }
    });

    expect(event.body.field).toEqual('My body field');
  });
});
