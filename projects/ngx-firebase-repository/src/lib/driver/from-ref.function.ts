import { onSnapshot } from 'firebase/firestore';
import { asyncScheduler, Observable, SchedulerLike, Subscriber } from 'rxjs';

export function fromRef<T>(ref: any, scheduler: SchedulerLike = asyncScheduler): Observable<T> {
  return new Observable((subscriber: Subscriber<any>) => {
    let unsubscribe: any;
    if (scheduler != null) {
      scheduler.schedule(() => {
        unsubscribe = onSnapshot(ref, {includeMetadataChanges: true}, subscriber);
      });
    } else {
      unsubscribe = onSnapshot(ref, {includeMetadataChanges: true}, subscriber);
    }

    return () => {
      if (unsubscribe != null) {
        unsubscribe();
      }
    };
  });
}
