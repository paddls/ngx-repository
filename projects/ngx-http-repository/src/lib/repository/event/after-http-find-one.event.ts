import {Type} from '@angular/core';
import {InternalEvent} from '@paddls/ngx-repository';

export class AfterHttpFindOneEvent<T> implements InternalEvent {

  public type: Type<any>;

  public query: any;

  public data: T;

  public constructor(data: Partial<AfterHttpFindOneEvent<T>>) {
    Object.assign(this, data);
  }
}
