import {InternalEvent} from '@witty-services/ngx-repository';

export class BeforeFirestoreFindOneEvent implements InternalEvent {

  public query: any;

  public constructor(data: Partial<BeforeFirestoreFindOneEvent>) {
    Object.assign(this, data);
  }
}
