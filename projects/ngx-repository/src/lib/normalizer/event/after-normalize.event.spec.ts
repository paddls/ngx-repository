import { AfterNormalizeEvent } from './after-normalize.event';

describe('AfterNormalizeEvent', () => {

  it('should build after normalize event with data', () => {
    const event: AfterNormalizeEvent = new AfterNormalizeEvent({
      body: {
        field: 'My body field'
      }
    });

    expect(event.body.field).toEqual('My body field');
  });
});
