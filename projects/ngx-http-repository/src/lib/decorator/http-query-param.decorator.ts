import {HttpQueryParamContext, HttpQueryParamContextConfiguration} from '../configuration/context/http-query-param-context.configuration';

/**
 * @ignore
 */
export const HTTP_QUERY_PARAM_METADATA_KEY: string = 'httpQueryParams';

export function HttpQueryParam(params?: HttpQueryParamContext|string): any {
  return (target: any, propertyKey: string) => {
    let httpQueryParamContextConfiguration: HttpQueryParamContextConfiguration = {
      propertyKey,
      name: propertyKey,
      format: ':value'
    };

    if (typeof params === 'object') {
      httpQueryParamContextConfiguration = {
        ...httpQueryParamContextConfiguration,
        ...params
      };
    } else if (typeof params === 'string') {
      httpQueryParamContextConfiguration.name = params;
    }

    let metas: HttpQueryParamContextConfiguration[] = [];
    if (Reflect.hasMetadata(HTTP_QUERY_PARAM_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(HTTP_QUERY_PARAM_METADATA_KEY, target);
    }
    Reflect.defineMetadata(HTTP_QUERY_PARAM_METADATA_KEY, metas.concat(httpQueryParamContextConfiguration), target);
  };
}
