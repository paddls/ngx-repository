import {QueryBuilder} from '../query-builder';
import {HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpResourceContext} from '../../decorator/http/http-resource.decorator';
import {HttpQuerySettings} from './http.query-settings';
import {PathContextUtil} from '../../common/path/path-context-util';
import {HTTP_PARAM_METADATA_KEY, HttpParamContextConfiguration} from '../../decorator/http/http-param.decorator';
import {HTTP_QUERY_PARAM_METADATA_KEY, HttpQueryParamContextConfiguration} from '../../decorator/http/http-query-param.decorator';
import {HTTP_HEADER_METADATA_KEY, HttpHeaderContextConfiguration} from '../../decorator/http/http-header.decorator';
import {cloneDeep} from 'lodash';

@Injectable()
export class HttpQueryBuilder implements QueryBuilder<HttpResourceContext, HttpRequest<any>> {

  public constructor() {
  }

  public buildCreateQuery<K>(query: HttpQuerySettings<K>): HttpRequest<any> {
    return this.buildRequest(
      query,
      new HttpRequest<any>(
        'POST',
        PathContextUtil.getUpdatePath(query.resourceConfiguration),
        {}
      )
    );
  }

  public buildDeleteQuery<K>(query: HttpQuerySettings<K>): HttpRequest<any> {
    return this.buildRequest(
      query,
      new HttpRequest<any>('DELETE', PathContextUtil.getReadPath(query.resourceConfiguration))
    );
  }

  public buildReadQuery<K>(query: HttpQuerySettings<K>): HttpRequest<any> {
    return this.buildRequest(
      query,
      new HttpRequest<any>('GET', PathContextUtil.getReadPath(query.resourceConfiguration))
    );
  }

  public buildUpdateQuery<K>(query: HttpQuerySettings<K>): HttpRequest<any> {
    return this.buildRequest(
      query,
      new HttpRequest<any>(
        'PUT',
        PathContextUtil.getUpdatePath(query.resourceConfiguration),
        {}
      )
    );
  }

  protected buildRequest<K>(query: HttpQuerySettings<K>, httpRequest: HttpRequest<any>): HttpRequest<any> {
    if (!query || !query.settings) {
      return httpRequest;
    }

    if (query.settings.id) {
      httpRequest = httpRequest.clone({
        url: `${httpRequest.url}/${query.settings.id}`
      });
    }

    const httpParams: HttpParamContextConfiguration[] = Reflect.getMetadata(HTTP_PARAM_METADATA_KEY, query.settings) || [];
    httpParams.forEach((httpParam: HttpParamContextConfiguration) => httpRequest = httpRequest.clone({
      url: httpRequest.url.replace(`:${httpParam.name}`, query.settings[httpParam.propertyKey])
    }));

    const httpQueryParams: HttpQueryParamContextConfiguration[] = Reflect.getMetadata(HTTP_QUERY_PARAM_METADATA_KEY, query.settings) || [];
    httpQueryParams.forEach((httpQueryParam: HttpQueryParamContextConfiguration) => {
      if (query.settings[httpQueryParam.propertyKey] != null) {
        return;
      }

      httpRequest = httpRequest.clone({
        params: httpRequest.params.append(
          httpQueryParam.name,
          cloneDeep(httpQueryParam.format).replace(/:value/gi, query.settings[httpQueryParam.propertyKey])
        )
      });
    });

    const httpHeaders: HttpHeaderContextConfiguration[] = Reflect.getMetadata(HTTP_HEADER_METADATA_KEY, query.settings) || [];
    httpHeaders.forEach((httpHeader: HttpHeaderContextConfiguration) => {
      if (query.settings[httpHeader.propertyKey] != null) {
        return;
      }

      httpRequest = httpRequest.clone({
        headers: httpRequest.headers.append(httpHeader.name, query.settings[httpHeader.propertyKey])
      });
    });

    return httpRequest;
  }
}
