import { Type } from '@angular/core';
import { InternalEvent } from '@paddls/ngx-repository';
import { HttpWriteOperation } from '../../request/http.operation';

export class HttpRequestDequeuedEvent<T> implements InternalEvent {

  public type: Type<any>;

  public operation: HttpWriteOperation;

  public object: T;

  public query: any;

  public constructor(data: Partial<HttpRequestDequeuedEvent<T>>) {
    Object.assign(this, data);
  }
}
