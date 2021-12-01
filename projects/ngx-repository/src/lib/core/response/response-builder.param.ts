import { ResponseProcessorToken } from './response-processor.token';

export interface ResponseBuilderParam {
  preResponseProcessors?: ResponseProcessorToken[];
  bodyResponseProcessors?: ResponseProcessorToken[];
  postResponseProcessors?: ResponseProcessorToken[];
}
