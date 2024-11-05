import { InternalEvent } from '@paddls/ngx-repository';

export class BeforeFirestorePatchEvent<T> implements InternalEvent {

  public object: T;

  public query: any;

  public constructor(data: Partial<BeforeFirestorePatchEvent<T>>) {
    Object.assign(this, data);
  }
}
