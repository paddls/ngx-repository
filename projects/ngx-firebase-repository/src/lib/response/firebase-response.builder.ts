import {
  BuilderParam,
  ConfigurationContextProvider,
  DenormalizeResponseProcessor,
  PageResponseProcessor,
  RequestManagerContext,
  ResponseBuilder,
  ResponseProcessor,
  TypeGetter
} from '@witty-services/ngx-repository';
import { Observable, of } from 'rxjs';
import { Injectable, Type } from '@angular/core';
import { FirebaseRepositoryResponse } from './firebase-repository.response';
import { merge } from 'lodash';



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
