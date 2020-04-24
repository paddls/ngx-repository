import {ResponseBuilder} from '../../item-builder/response-builder';

export interface PathContext {
  path?: string;
  read?: string;
  write?: string;
  create?: string|CreatePathContext;
  update?: string;
  delete?: string;
}

export interface CreatePathContext {
  path: string;
  responseBuilder: (new(...args: any[]) => ResponseBuilder<any>);
}
