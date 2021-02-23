import { BuilderParam, RequestManagerContext, ResponseBuilder } from '@witty-services/ngx-repository';
import { Observable, of } from 'rxjs';
import { Injectable, Type } from '@angular/core';
import { FirebaseRepositoryResponse } from './firebase-repository.response';
import { ConfigurationContextProvider } from '../../../../ngx-repository/src/lib/core/configuration/configuration-context.provider';
import { ResponseProcessor } from '../../../../ngx-repository/src/lib/core/response/transformer/response.processor';
import { merge } from 'lodash';
import { TypeGetter } from '../../../../ngx-repository/src/lib/core/common/model/type-getter.type';
import { DenormalizeResponseProcessor } from '../../../../ngx-repository/src/lib/core/response/transformer/denormalize-response.processor';
import { PageResponseProcessor } from '../../../../ngx-repository/src/lib/core/response/transformer/page-response.processor';

export interface FirebaseResponseBuilderParam {
  denormalizeResponseProcessor?: TypeGetter<ResponseProcessor>;
  pageResponseProcessor?: TypeGetter<ResponseProcessor>;
}

@Injectable()
export class FirebaseResponseBuilder extends ResponseBuilder {

  protected static readonly defaultConfiguration: FirebaseResponseBuilderParam = {
    denormalizeResponseProcessor: () => DenormalizeResponseProcessor,
    pageResponseProcessor: () => PageResponseProcessor
  };

  public static withParams(params: FirebaseResponseBuilderParam = {}): BuilderParam<ResponseBuilder> {
    return {
      builder: () => FirebaseResponseBuilder,
      params: merge({}, FirebaseResponseBuilder.defaultConfiguration, params)
    };
  }

  public build(response: FirebaseRepositoryResponse, { configuration, query }: RequestManagerContext): Observable<any> {
    return of(response.getBody());
  }

  public getProcessors(configuration: ConfigurationContextProvider): Type<ResponseProcessor>[] {
    return [
      DenormalizeResponseProcessor,
      PageResponseProcessor
    ];
  }

  protected getDefaultParams(): any {
    return FirebaseResponseBuilder.defaultConfiguration;
  }
}
