import { InternalEvent } from '@paddls/ngx-repository';

export class AfterFirestoreFindAllEvent<T> implements InternalEvent {

  public query: any;

  public data: T;

  public constructor(data: Partial<AfterFirestoreFindAllEvent<T>>) {
    Object.assign(this, data);
  }
}
