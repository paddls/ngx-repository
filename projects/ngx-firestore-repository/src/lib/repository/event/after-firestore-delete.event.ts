import { InternalEvent } from '@paddls/ngx-repository';

export class AfterFirestoreDeleteEvent<T, K> implements InternalEvent {

  public object: T;

  public query: any;

  public data: K;

  public constructor(data: Partial<AfterFirestoreDeleteEvent<T, K>>) {
    Object.assign(this, data);
  }
}
