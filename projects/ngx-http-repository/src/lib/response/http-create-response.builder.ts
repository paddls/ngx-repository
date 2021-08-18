import {
  BuilderParam,
  ConfigurationContextProvider,
  IdResponseProcessor,
  ResponseBuilder,
  ResponseProcessor
} from '@witty-services/ngx-repository';
import { Injectable, Type } from '@angular/core';
import { merge } from 'lodash';
import { HttpResponseBuilder, HttpResponseBuilderParam } from './http-response.builder';

export interface HttpCreateResponseBuilderParam extends HttpResponseBuilderParam {

}

@Injectable()
export class HttpCreateResponseBuilder extends HttpResponseBuilder {

  protected static readonly defaultConfiguration: HttpCreateResponseBuilderParam = {
    ...HttpResponseBuilder.defaultConfiguration
  };

  public static withParams(params: HttpCreateResponseBuilderParam = {}): BuilderParam<ResponseBuilder> {
    return {
      builder: HttpCreateResponseBuilder,
      params: merge({}, HttpCreateResponseBuilder.defaultConfiguration, params)
    };
  }

  public getProcessors(configuration: ConfigurationContextProvider): Type<ResponseProcessor>[] {
    return [
      ...super.getProcessors(configuration),
      IdResponseProcessor
    ];
  }

  protected getDefaultParams(): any {
    return HttpCreateResponseBuilder.defaultConfiguration;
  }
}
