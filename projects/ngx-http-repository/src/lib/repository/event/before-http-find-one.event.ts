import {Type} from '@angular/core';
import {InternalEvent} from '@paddls/ngx-repository';

export class BeforeHttpFindOneEvent implements InternalEvent {

  public type: Type<any>;

  public query: any;

  public constructor(data: Partial<BeforeHttpFindOneEvent>) {
    Object.assign(this, data);
  }
}
