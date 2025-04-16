import { HttpBodyFn, HttpQueryFn, HttpRequestParamsContext } from '../configuration/context/http-request-params-context.configuration';
import { TypeGetter } from '@paddls/ngx-repository';
import { buildHttpRequestFunction } from './common-function';

/**
 * Generate method to invoke Http Get request. By default HttpQueryFn but can be changed to HttpBodyFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function httpGet<R, Q = any, B = any>(params: string | HttpRequestParamsContext, responseType: TypeGetter): HttpQueryFn<R, Q> | HttpBodyFn<R, B, Q> {
  return buildHttpRequestFunction(params, responseType, 'GET', false);
}
