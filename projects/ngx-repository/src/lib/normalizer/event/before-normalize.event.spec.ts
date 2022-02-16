import { BeforeNormalizeEvent } from './before-normalize.event';

describe('BeforeNormalizeEvent', () => {

  it('should build before normalize event with data', () => {
    const event: BeforeNormalizeEvent = new BeforeNormalizeEvent({
      body: {
        field: 'My body field'
      }
    });

    expect(event.body.field).toEqual('My body field');
  });
});
