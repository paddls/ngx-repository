import { InternalEvent } from '@paddls/ngx-repository';

export class AfterFirestorePatchEvent<T, K> implements InternalEvent {

  public object: T;

  public query: any;

  public data: K;

  public constructor(data: Partial<AfterFirestorePatchEvent<T, K>>) {
    Object.assign(this, data);
  }
}
