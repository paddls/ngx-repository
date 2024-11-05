import { InternalEvent } from '@paddls/ngx-repository';

export class BeforeFirestoreDeleteEvent<T> implements InternalEvent {

  public object: T;

  public query: any;

  public constructor(data: Partial<BeforeFirestoreDeleteEvent<T>>) {
    Object.assign(this, data);
  }
}
