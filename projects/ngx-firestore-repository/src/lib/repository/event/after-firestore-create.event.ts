import {InternalEvent} from '@paddls/ngx-repository';

export class AfterFirestoreCreateEvent<T, K> implements InternalEvent {

  public object: T;

  public query: any;

  public data: K;

  public constructor(data: Partial<AfterFirestoreCreateEvent<T, K>>) {
    Object.assign(this, data);
  }
}
