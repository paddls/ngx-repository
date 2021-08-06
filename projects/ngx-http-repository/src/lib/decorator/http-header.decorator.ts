import { HttpHeaderContext } from '../configuration/context/http-header-context.configuration';
import { setParamsMetadata } from './http-param-decorator.util';

/**
 * @ignore
 */
export const HTTP_HEADER_METADATA_KEY: string = 'httpHeaders';

export function HttpHeader(params?: HttpHeaderContext | string): any {
  return setParamsMetadata(HTTP_HEADER_METADATA_KEY, params);
}
