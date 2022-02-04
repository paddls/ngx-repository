import {InternalEvent} from '@witty-services/ngx-repository';

export class AfterFirestoreUpdateEvent<T, K> implements InternalEvent {

  public object: T;

  public query: any;

  public data: K;

  public constructor(data: Partial<AfterFirestoreUpdateEvent<T, K>>) {
    Object.assign(this, data);
  }
}
