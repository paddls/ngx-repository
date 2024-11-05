import { InternalEvent } from '@paddls/ngx-repository';

export class AfterFirestoreFindOneEvent<T> implements InternalEvent {

  public query: any;

  public data: T;

  public constructor(data: Partial<AfterFirestoreFindOneEvent<T>>) {
    Object.assign(this, data);
  }
}
