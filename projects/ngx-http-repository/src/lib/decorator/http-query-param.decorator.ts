import { HttpQueryParamContext } from '../configuration/context/http-query-param-context.configuration';
import { setParamsMetadata } from './http-param-decorator.util';

/**
 * @ignore
 */
export const HTTP_QUERY_PARAM_METADATA_KEY: string = 'httpQueryParams';

export function HttpQueryParam(params?: HttpQueryParamContext | string): any {
  return setParamsMetadata(HTTP_QUERY_PARAM_METADATA_KEY, params);
}
