import { Type } from '@angular/core';
import { ResponseProcessor } from './processor/response.processor';
import { ResponseProcessorWithParams } from './response-processor-with.params';

export type ResponseProcessorToken = Type<ResponseProcessor> | ResponseProcessorWithParams;
