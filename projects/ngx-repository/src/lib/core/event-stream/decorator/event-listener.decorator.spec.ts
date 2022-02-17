import { EventListener } from './event-listener.decorator';
import { PublisherService } from '../publisher.service';
import { Listener } from '../listener';
import { Observable, Subject } from 'rxjs';
import { BeforeDenormalizeEvent } from '../../../normalizer/event/before-denormalize.event';

let publisher$: Subject<any>;

beforeEach(() => {
  publisher$ = new Subject<any>();

  spyOn(PublisherService, 'addListenerToRegistry').and.returnValue(void 0);
  spyOn(PublisherService, 'getPublisher').and.returnValue(publisher$);
});

describe('EventListenerDecorator', () => {
  it('should add listener to registry when no predicate', () => {
    @EventListener()
    class NoPredicateEventListener implements Listener<any> {

      public on(): void {
      }
    }

    expect(PublisherService.addListenerToRegistry).toHaveBeenCalledWith(jasmine.anything(), NoPredicateEventListener);
  });

  it('should add listener to registry when one predicate', () => {
    @EventListener(() => true)
    class SinglePredicateEventListener implements Listener<any> {

      public on(): void {
      }
    }

    expect(PublisherService.addListenerToRegistry).toHaveBeenCalledWith(jasmine.anything(), SinglePredicateEventListener);
  });

  it('should add listener to registry when multiple predicates', () => {
    @EventListener([() => false, () => true])
    class MultiplePredicatesEventListener implements Listener<any> {

      public on(): void {
      }
    }

    expect(PublisherService.addListenerToRegistry).toHaveBeenCalledWith(jasmine.anything(), MultiplePredicatesEventListener);
  });

  it('should add listener to property when one predicate', (done: DoneFn) => {
    class RandomClass {

      @EventListener(() => true)
      public listener$: Observable<any>;
    }

    const randomClass: RandomClass = new RandomClass();

    randomClass.listener$.subscribe((v: any) => {
      expect(v).toBeInstanceOf(BeforeDenormalizeEvent);
      done();
    });

    publisher$.next(new BeforeDenormalizeEvent());
  });

  it('should add listener to property when multiple predicates', (done: DoneFn) => {
    class RandomClass {

      @EventListener([() => false, () => true])
      public listener$: Observable<any>;
    }

    const randomClass: RandomClass = new RandomClass();

    randomClass.listener$.subscribe((v: any) => {
      expect(v).toBeInstanceOf(BeforeDenormalizeEvent);
      done();
    });

    publisher$.next(new BeforeDenormalizeEvent());
  });
});
