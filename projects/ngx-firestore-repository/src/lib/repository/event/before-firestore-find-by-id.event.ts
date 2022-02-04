import {InternalEvent} from '@witty-services/ngx-repository';

export class BeforeFirestoreFindByIdEvent<K> implements InternalEvent {

  public id: K;

  public query: any;

  public constructor(data: Partial<BeforeFirestoreFindByIdEvent<K>>) {
    Object.assign(this, data);
  }
}
