import { PublisherService } from './publisher.service';
import { Listener } from './listener';
import { EventListener } from './decorator/event-listener.decorator';
import { TestBed } from '@angular/core/testing';
import { AfterDenormalizeEvent } from '../../normalizer/event/after-denormalize.event';
import { Injectable } from '@angular/core';

@Injectable()
@EventListener(() => true)
class MyEventListener implements Listener<any> {

  public on(): void {
  }
}

let service: PublisherService;
let listener: MyEventListener;

describe('PublisherService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        PublisherService,
        MyEventListener
      ]
    });

    service = TestBed.inject(PublisherService);
    listener = TestBed.inject(MyEventListener);
  });

  describe('#publish()', () => {
    it('should publish item to registry items', () => {
      spyOn(listener, 'on').and.callThrough();

      PublisherService.addListenerToRegistry(() => true, MyEventListener);

      service.publish(new AfterDenormalizeEvent());

      expect(listener.on).toHaveBeenCalled();
    });
  });

  describe('#getPublisher()', () => {
    it('should return valid publisher', () => {
      expect(PublisherService.getPublisher()).toBeDefined();
    });
  });
});
