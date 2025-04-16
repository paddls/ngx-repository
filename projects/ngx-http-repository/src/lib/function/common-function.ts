import { HttpBodyFn, HttpQueryFn, HttpRequestParamsContext } from '../configuration/context/http-request-params-context.configuration';
import { isString } from '../utils/is-string';
import { ConfigurationContextProvider, ConfigurationProvider, NgxRepositoryModule, RepositoryDriver, RequestManager, ResponseBuilder, TypeGetter } from '@paddls/ngx-repository';
import { HttpRepositoryDriver } from '../driver/http-repository.driver';
import { HttpRequestBuilder } from '../request/http-request.builder';
import { flattenDeep } from '../utils/flatten-deep';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export function httpRequest<T>(params: HttpRequestParamsContext): HttpQueryFn<T> | HttpBodyFn<T> {
  const requestManager: RequestManager = inject(RequestManager);
  const driver: RepositoryDriver = inject(HttpRepositoryDriver);
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
}

function formatParams(params: string | HttpRequestParamsContext): HttpRequestParamsContext {
  return isString(params) ? {
    path: params as string
  } : params as HttpRequestParamsContext;
}

export function buildHttpRequestFunction<T>(params: string | HttpRequestParamsContext, responseType: TypeGetter, method: string, withBody: boolean): HttpQueryFn<T> | HttpBodyFn<T> {
  const formattedParams: HttpRequestParamsContext = formatParams(params);

  return httpRequest({
    responseType,
    withBody,
    ...formattedParams,
    method
  });
}
