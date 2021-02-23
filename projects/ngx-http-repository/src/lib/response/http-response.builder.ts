import { BuilderParam, RequestManagerContext, ResponseBuilder } from '@witty-services/ngx-repository';
import { Injectable, Type } from '@angular/core';
import { get, isObject, merge } from 'lodash';
import { HttpRepositoryResponse } from './http-repository.response';
import { ResponseProcessor } from '../../../../ngx-repository/src/lib/core/response/transformer/response.processor';
import { TypeGetter } from '../../../../ngx-repository/src/lib/core/common/model/type-getter.type';
import { ConfigurationContextProvider } from '../../../../ngx-repository/src/lib/core/configuration/configuration-context.provider';
import { Observable, of } from 'rxjs';
import { DenormalizeResponseProcessor } from '../../../../ngx-repository/src/lib/core/response/transformer/denormalize-response.processor';
import { PageResponseProcessor } from '../../../../ngx-repository/src/lib/core/response/transformer/page-response.processor';

export interface HttpResponseBuilderParam {
  denormalizeResponseProcessor?: TypeGetter<ResponseProcessor>;
  pageResponseProcessor?: TypeGetter<ResponseProcessor>;
}

@Injectable()
export class HttpResponseBuilder extends ResponseBuilder {

  protected static readonly defaultConfiguration: HttpResponseBuilderParam = {
    denormalizeResponseProcessor: () => DenormalizeResponseProcessor,
    pageResponseProcessor: () => PageResponseProcessor
  };

  public static withParams(params: HttpResponseBuilderParam = {}): BuilderParam<ResponseBuilder> {
    return {
      builder: () => HttpResponseBuilder,
      params: merge({}, HttpResponseBuilder.defaultConfiguration, params)
    };
  }

  public build(response: HttpRepositoryResponse, context: RequestManagerContext): Observable<any> {
    return of(response.getBody());
  }

  public getProcessors(configuration: ConfigurationContextProvider): Type<ResponseProcessor>[] {
    return [
      this.getParams<HttpResponseBuilderParam>('denormalizeResponseProcessor', configuration)(),
      this.getParams<HttpResponseBuilderParam>('pageResponseProcessor', configuration)()
    ];
  }

  // TODO @RMA move to ResponseBuilder
  protected getDefaultParams(): any {
    return HttpResponseBuilder.defaultConfiguration;
  }

  protected getParams<T>(key: keyof T, configuration: ConfigurationContextProvider): any {
    const builderParam: BuilderParam<ResponseBuilder> = configuration.findConfiguration('response');
    const defaultParam: any = this.getDefaultParams()[key];

    if (isObject(builderParam)) {
      return get(builderParam, `params.${ key }`, defaultParam);
    } else {
      return defaultParam;
    }
  }
}
