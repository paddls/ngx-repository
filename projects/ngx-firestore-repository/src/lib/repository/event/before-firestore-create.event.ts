import { InternalEvent } from '@paddls/ngx-repository';

export class BeforeFirestoreCreateEvent<T> implements InternalEvent {

  public object: T;

  public query: any;

  public constructor(data: Partial<BeforeFirestoreCreateEvent<T>>) {
    Object.assign(this, data);
  }
}
