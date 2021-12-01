import { Type } from '@angular/core';
import { ResponseProcessor } from './processor/response.processor';

export interface ResponseProcessorWithParams<T = any> {
  type: Type<ResponseProcessor>;
  params: T;
}
