import {Injectable} from '@angular/core';
import {HttpResourceContext} from './decorator/http-resource.decorator';
import {HttpQuerySettings} from './http.query-settings';
import {HTTP_QUERY_PARAM_METADATA_KEY, HttpQueryParamContextConfiguration} from './decorator/http-query-param.decorator';
import {HTTP_HEADER_METADATA_KEY, HttpHeaderContextConfiguration} from './decorator/http-header.decorator';
import {cloneDeep} from 'lodash';
import {HttpRequest} from './http.request';
import {isNullOrUndefined} from 'util';
import {PathQueryBuilder} from '../query-builder/path.query-builder';

@Injectable()
export class HttpQueryBuilder extends PathQueryBuilder<HttpResourceContext> {

  public buildRequestFromQuery<K>(query: HttpQuerySettings<K>): HttpRequest<K> {
    const httpRequest: HttpRequest<K> = new HttpRequest(super.buildRequestFromQuery(query));

    if (!query || !query.settings) {
      return httpRequest;
    }

    this.makeHttpQueryParams(httpRequest, query)
      .makeHttpHeaders(httpRequest, query);

    return httpRequest;
  }

  protected makeHttpQueryParams<K>(httpRequest: HttpRequest<K>, query: HttpQuerySettings<K>): HttpQueryBuilder {
    const httpQueryParams: HttpQueryParamContextConfiguration[] = Reflect.getMetadata(HTTP_QUERY_PARAM_METADATA_KEY, query.settings) || [];
    httpQueryParams.forEach((httpQueryParam: HttpQueryParamContextConfiguration) => {
      if (isNullOrUndefined(query.settings[httpQueryParam.propertyKey])) {
        return;
      }

      httpRequest.queryParams[httpQueryParam.name] = cloneDeep(httpQueryParam.format).replace(/:value/gi, query.settings[httpQueryParam.propertyKey]);
    });

    return this;
  }

  protected makeHttpHeaders<K>(httpRequest: HttpRequest<K>, query: HttpQuerySettings<K>): HttpQueryBuilder {
    const httpHeaders: HttpHeaderContextConfiguration[] = Reflect.getMetadata(HTTP_HEADER_METADATA_KEY, query.settings) || [];
    httpHeaders.forEach((httpHeader: HttpHeaderContextConfiguration) => {
      if (isNullOrUndefined(query.settings[httpHeader.propertyKey])) {
        return;
      }

      httpRequest.headers[httpHeader.name] = `${query.settings[httpHeader.propertyKey]}`;
    });

    return this;
  }
}
