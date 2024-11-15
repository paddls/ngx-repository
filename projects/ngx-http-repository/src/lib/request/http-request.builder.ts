import { Observable, of } from 'rxjs';
import {
  AfterNormalizeEvent,
  BeforeNormalizeEvent,
  ConfigurationContextProvider,
  getDeepQueryMetadataValues,
  Path,
  PublisherService,
  RepositoryNormalizer,
  RepositoryRequest,
  RequestBuilder,
  RequestManagerContext
} from '@paddls/ngx-repository';
import { HttpRepositoryRequest } from './http-repository.request';
import { Injectable } from '@angular/core';
import { HTTP_QUERY_PARAM_METADATA_KEY } from '../decorator/http-query-param.decorator';
import { HttpParams } from '@angular/common/http';
import { HTTP_HEADER_METADATA_KEY } from '../decorator/http-header.decorator';
import { HttpOperation } from './http.operation';
import { HttpRepositoryParamConfiguration } from '../configuration/http-repository-param.configuration';
import { HttpQueryParamContextConfiguration } from '../configuration/context/http-query-param-context.configuration';
import { HttpHeaderContextConfiguration } from '../configuration/context/http-header-context.configuration';
import { HttpParamContextConfiguration } from '../configuration/context/http-param-context.configuration';

import {
  HttpRepositoryWriteParamContextConfiguration
} from '../configuration/context/http-repository-write-param-context.configuration';
import { HTTP_MULTIPART_COLUMN_METADATA_KEY, HttpMultipartColumnContext } from '../decorator/http-multipart-resource';
import { get } from '../utils/get';

@Injectable()
export class HttpRequestBuilder implements RequestBuilder {

  public constructor(private readonly normalizer: RepositoryNormalizer) {
  }

  public build({body, query, configuration}: RequestManagerContext): Observable<RepositoryRequest> {
    const method: string = this.getMethod(configuration);
    const path: Path = this.getPath(body, query, configuration);
    const normalizedBody: any = this.getBody(body, configuration);
    const queryParams: any = this.getQueryParams(query);
    const headers: any = this.getHeaders(query);

    return of(new HttpRepositoryRequest(method, normalizedBody, path, headers, queryParams));
  }

  protected getPath(body: any, query: any, configuration: ConfigurationContextProvider): Path {
    const path: string = configuration.getConfiguration<HttpRepositoryParamConfiguration>('path');

    return new Path(body, query, path, this.normalizer.getNormalizer());
  }

  protected getBody(body: any, configuration: ConfigurationContextProvider): any {
    if (!body) {
      return null;
    }

    const multipart: string = configuration.findConfiguration<HttpRepositoryWriteParamContextConfiguration>('multipart');
    const normalizedBody = this.normalize(body);

    if (multipart) {
      const data: FormData = new FormData();
      data.set(multipart, new Blob([JSON.stringify(normalizedBody)], {type: 'application/json'}));

      const parts: HttpMultipartColumnContext[] = Reflect.getMetadata(HTTP_MULTIPART_COLUMN_METADATA_KEY, body) || [];
      parts.forEach((part: HttpMultipartColumnContext) => {
        if (body[part.propertyKey]) {
          data.set(part.name, body[part.propertyKey]);
        }
      });

      return data;
    }

    return normalizedBody;
  }

  protected normalize(body: any): any {
    PublisherService.getInstance().publish(new BeforeNormalizeEvent({body}));
    const data: any = this.normalizer.normalize(body);
    PublisherService.getInstance().publish(new AfterNormalizeEvent({body, data}));

    return data;
  }

  protected getQueryParams(query: any): HttpParams {
    let params: HttpParams = new HttpParams();
    if (query) {
      const httpQueryParams: HttpQueryParamContextConfiguration[] = getDeepQueryMetadataValues(HTTP_QUERY_PARAM_METADATA_KEY, query);

      httpQueryParams.forEach((httpQueryParam: HttpQueryParamContextConfiguration) => {
        this.setParam(query, httpQueryParam, (value: any) => {
          params = params.append(httpQueryParam.name, value);
        });
      });
    }

    return params;
  }

  protected getHeaders(query: any, headers: any = {}): any {
    if (query) {
      const httpHeaders: HttpHeaderContextConfiguration[] = getDeepQueryMetadataValues(HTTP_HEADER_METADATA_KEY, query);

      httpHeaders.forEach((httpHeader: HttpHeaderContextConfiguration) => {
        this.setParam(query, httpHeader, (value: any) => {
          headers[httpHeader.name] = `${value}`;
        });
      });
    }

    return headers;
  }

  protected setParam(query: any, params: HttpParamContextConfiguration, setter: (value: any) => void): void {
    let property: any = get(query, params.propertyKey);

    if (property == null) {
      return;
    }

    property = Array.isArray(property) ? property : [property];

    property.forEach((p: any) => {
      let value: string;
      if (params.customConverter) {
        value = new (params.customConverter())().toJson(p, this.normalizer.getNormalizer());
      } else {
        value = params.format.replace(/:value/gi, p);
      }

      setter(value);
    });
  }

  // TODO @RMA move to Repository side - use method configuration instead
  protected getMethod(configuration: ConfigurationContextProvider): string {
    const operation: HttpOperation = configuration.getOperation() as HttpOperation;

    switch (operation) {
      case 'findAll':
      case 'findById':
      case 'findOne':
        return 'GET';
      case 'create':
        return 'POST';
      case 'update':
        return 'PUT';
      case 'patch':
        return 'PATCH';
      case 'delete':
        return 'DELETE';
    }

    return configuration.getConfiguration<HttpRepositoryParamConfiguration>('method');
  }
}
