import { TypeGetter } from '../common/model/type-getter.type';
import { RequestBuilder } from '../request/request.builder';
import { ResponseBuilder } from '../response/response.builder';
import { NormalizerConfiguration } from '@witty-services/ts-serializer';
import { Type } from '@angular/core';

export type BuilderParam<T> = Type<T> | TypeGetter<T> | { builder: Type<T>, params: any };

export interface ResourceParamConfiguration {
  /**
   * @deprecated show use requestBuilder
   * TODO @RMA rename to requestBuilder
   */
  request?: BuilderParam<RequestBuilder>;
  normalizerConfiguration?: NormalizerConfiguration;
  responseBuilder?: BuilderParam<ResponseBuilder>;
  responseType?: TypeGetter;
}
