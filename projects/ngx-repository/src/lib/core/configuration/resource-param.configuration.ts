import { TypeGetter } from '../common/model/type-getter.type';
import { RequestBuilder } from '../request/request.builder';
import { ResponseBuilder } from '../response/response.builder';
import { NormalizerConfiguration } from '@witty-services/ts-serializer';

export type BuilderParam<T> = TypeGetter<T> | { builder: TypeGetter<T>, params: any };

export interface ResourceParamConfiguration {
  request?: BuilderParam<RequestBuilder>;
  normalizer?: NormalizerConfiguration;
  response?: BuilderParam<ResponseBuilder>;
  responseType?: TypeGetter;
}
