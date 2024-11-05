import { InternalEvent } from '@paddls/ngx-repository';

export class BeforeFirestoreFindAllEvent implements InternalEvent {

  public query: any;

  public constructor(data: Partial<BeforeFirestoreFindAllEvent>) {
    Object.assign(this, data);
  }
}
