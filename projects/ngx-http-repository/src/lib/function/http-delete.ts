import { HttpBodyFn, HttpQueryFn, HttpRequestParamsContext } from '../configuration/context/http-request-params-context.configuration';
import { TypeGetter } from '@paddls/ngx-repository';
import { buildHttpRequestFunction } from './common-function';

/**
 * Generate method to invoke Http Delete request. By default HttpBodyFn but can be changed to HttpQueryFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function httpDelete<R, B = any, Q = any>(params: string | HttpRequestParamsContext, responseType: TypeGetter): HttpBodyFn<R, B, Q> | HttpQueryFn<R, Q> {
  return buildHttpRequestFunction(params, responseType, 'DELETE', true);
}
