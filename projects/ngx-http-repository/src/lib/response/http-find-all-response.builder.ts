import {
  BuilderParam,
  ConfigurationContextProvider,
  PageResponseProcessor,
  ResponseBuilder,
  ResponseProcessor
} from '@witty-services/ngx-repository';
import { Injectable, Type } from '@angular/core';
import { merge } from 'lodash';
import { HttpResponseBuilder, HttpResponseBuilderParam } from './http-response.builder';

export interface HttpFindAllResponseBuilderParam extends HttpResponseBuilderParam {
  pageResponseProcessor?: Type<ResponseProcessor>;
}

@Injectable()
export class HttpFindAllResponseBuilder extends HttpResponseBuilder {

  protected static readonly defaultConfiguration: HttpFindAllResponseBuilderParam = {
    ...HttpResponseBuilder.defaultConfiguration,
    pageResponseProcessor: PageResponseProcessor
  };

  public static withParams(params: HttpFindAllResponseBuilderParam = {}): BuilderParam<ResponseBuilder> {
    return {
      builder: HttpFindAllResponseBuilder,
      params: merge({}, HttpFindAllResponseBuilder.defaultConfiguration, params)
    };
  }

  public getProcessors(configuration: ConfigurationContextProvider): Type<ResponseProcessor>[] {
    return [
      ...super.getProcessors(configuration),
      this.getParams<HttpFindAllResponseBuilderParam>('pageResponseProcessor', configuration)
    ];
  }

  protected getDefaultParams(): any {
    return HttpFindAllResponseBuilder.defaultConfiguration;
  }
}
