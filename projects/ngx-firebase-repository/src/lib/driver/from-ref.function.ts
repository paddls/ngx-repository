import { asyncScheduler, Observable, SchedulerLike, Subscriber } from 'rxjs';

export function fromRef<T>(ref: any, scheduler: SchedulerLike = asyncScheduler): Observable<T> {
  return new Observable((subscriber: Subscriber<T>) => {
    let unsubscribe: any;
    if (scheduler != null) {
      scheduler.schedule(() => {
        unsubscribe = ref.onSnapshot(subscriber);
      });
    } else {
      unsubscribe = ref.onSnapshot(subscriber);
    }

    return () => {
      if (unsubscribe != null) {
        unsubscribe();
      }
    };
  });
}
