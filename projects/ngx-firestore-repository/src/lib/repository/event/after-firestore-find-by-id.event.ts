import { InternalEvent } from '@paddls/ngx-repository';

export class AfterFirestoreFindByIdEvent<T, K> implements InternalEvent {

  public id: K;

  public query: any;

  public data: T;

  public constructor(data: Partial<AfterFirestoreFindByIdEvent<T, K>>) {
    Object.assign(this, data);
  }
}
