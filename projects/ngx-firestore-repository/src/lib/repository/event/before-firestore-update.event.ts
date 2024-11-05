import { InternalEvent } from '@paddls/ngx-repository';

export class BeforeFirestoreUpdateEvent<T> implements InternalEvent {

  public object: T;

  public query: any;

  public constructor(data: Partial<BeforeFirestoreUpdateEvent<T>>) {
    Object.assign(this, data);
  }
}
