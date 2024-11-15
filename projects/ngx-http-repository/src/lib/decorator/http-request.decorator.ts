import { Injector } from '@angular/core';
import {
  ConfigurationContextProvider,
  ConfigurationProvider,
  NGX_REPOSITORY_INJECTOR_INSTANCE,
  NgxRepositoryModule,
  RepositoryDriver,
  RequestManager,
  ResponseBuilder,
  TypeGetter
} from '@paddls/ngx-repository';
import { HttpRepositoryDriver } from '../driver/http-repository.driver';
import { HttpRequestBuilder } from '../request/http-request.builder';
import { Observable } from 'rxjs';
import { HttpRequestParamsContext } from '../configuration/context/http-request-params-context.configuration';
import { flattenDeep } from '../utils/flatten-deep';
import { isString } from '../utils/is-string';

export function HttpRequestDecorator(params: HttpRequestParamsContext): PropertyDecorator {
  return (target: any, propertyKey: string) => {
    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): any {
        const injector: Injector = Reflect.getOwnMetadata(NGX_REPOSITORY_INJECTOR_INSTANCE, NgxRepositoryModule);
        const requestManager: RequestManager = injector.get(RequestManager);
        const driver: RepositoryDriver = injector.get(HttpRepositoryDriver);
        const configuration: ConfigurationContextProvider = new ConfigurationContextProvider(new ConfigurationProvider({
          requestBuilder: HttpRequestBuilder,
          responseBuilder: ResponseBuilder.withParams({
            postResponseProcessors: flattenDeep([params.postResponseProcessors || []])
          }),
          ...params
        }));

        const execute: (body: any, query: any) => Observable<any> = (body: any, query: any): Observable<any> => {
          return requestManager.execute({
            body,
            query,
            configuration,
            driver
          });
        };

        return params.withBody ? execute : (query: any) => execute(null, query);
      },
      enumerable: true,
      configurable: true
    });
  };
}

function formatParams(params: string | HttpRequestParamsContext): HttpRequestParamsContext {
  return isString(params) ? {
    path: params as string
  } : params as HttpRequestParamsContext;
}

function buildHttpRequestDecorator(params: string | HttpRequestParamsContext, responseType: TypeGetter, method: string, withBody: boolean): PropertyDecorator {
  const formattedParams: HttpRequestParamsContext = formatParams(params);

  return HttpRequestDecorator({
    responseType,
    withBody,
    ...formattedParams,
    method
  });
}

/**
 * Generate method to invoke Http Get request. By default HttpQueryFn but can be changed to HttpBodyFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function HttpGet(params: string | HttpRequestParamsContext, responseType: TypeGetter): PropertyDecorator {
  return buildHttpRequestDecorator(params, responseType, 'GET', false);
}

/**
 * Generate method to invoke Http Post request. By default HttpBodyFn but can be changed to HttpQueryFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function HttpPost(params: string | HttpRequestParamsContext, responseType: TypeGetter): PropertyDecorator {
  return buildHttpRequestDecorator(params, responseType, 'POST', true);
}

/**
 * Generate method to invoke Http Put request. By default HttpBodyFn but can be changed to HttpQueryFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function HttpPut(params: string | HttpRequestParamsContext, responseType: TypeGetter): PropertyDecorator {
  return buildHttpRequestDecorator(params, responseType, 'PUT', true);
}

/**
 * Generate method to invoke Http Patch request. By default HttpBodyFn but can be changed to HttpQueryFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function HttpPatch(params: string | HttpRequestParamsContext, responseType: TypeGetter): PropertyDecorator {
  return buildHttpRequestDecorator(params, responseType, 'PATCH', true);
}

/**
 * Generate method to invoke Http Delete request. By default HttpBodyFn but can be changed to HttpQueryFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function HttpDelete(params: string | HttpRequestParamsContext, responseType: TypeGetter): PropertyDecorator {
  return buildHttpRequestDecorator(params, responseType, 'DELETE', true);
}

/**
 * Generate method to invoke Http Option request. By default HttpQueryFn but can be changed to HttpBodyFn (see withBody option)
 * @param params path or full configuration object.
 * @param responseType type of the response for deserialization.
 */
export function HttpOption(params: string | HttpRequestParamsContext, responseType: TypeGetter): PropertyDecorator {
  return buildHttpRequestDecorator(params, responseType, 'OPTION', false);
}
