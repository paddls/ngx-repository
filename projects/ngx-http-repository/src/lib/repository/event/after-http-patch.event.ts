import { Type } from '@angular/core';
import { InternalEvent } from '@paddls/ngx-repository';

export class AfterHttpPatchEvent<T, K> implements InternalEvent {

  public type: Type<any>;

  public object: T;

  public query: any;

  public data: K;

  public constructor(data: Partial<AfterHttpPatchEvent<T, K>>) {
    Object.assign(this, data);
  }

  public static isInstanceOf(event: InternalEvent): boolean {
    return event instanceof AfterHttpPatchEvent;
  }
}
