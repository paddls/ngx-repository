import {
  BuilderParam,
  ConfigurationContextProvider,
  ResponseBuilder,
  ResponseProcessor,
  VoidResponseProcessor
} from '@witty-services/ngx-repository';
import { Injectable, Type } from '@angular/core';
import { merge } from 'lodash';
import { HttpResponseBuilder, HttpResponseBuilderParam } from './http-response.builder';

export interface HttpWriteResponseBuilderParam extends HttpResponseBuilderParam {

}

@Injectable()
export class HttpWriteResponseBuilder extends HttpResponseBuilder {

  protected static readonly defaultConfiguration: HttpWriteResponseBuilderParam = {
    ...HttpResponseBuilder.defaultConfiguration
  };

  public static withParams(params: HttpWriteResponseBuilderParam = {}): BuilderParam<ResponseBuilder> {
    return {
      builder: HttpWriteResponseBuilder,
      params: merge({}, HttpWriteResponseBuilder.defaultConfiguration, params)
    };
  }

  public getProcessors(configuration: ConfigurationContextProvider): Type<ResponseProcessor>[] {
    return [
      ...super.getProcessors(configuration),
      VoidResponseProcessor
    ];
  }

  protected getDefaultParams(): any {
    return HttpWriteResponseBuilder.defaultConfiguration;
  }
}
