import { RequestManagerContext } from './request-manager.context';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RepositoryRequest } from '../request/repository.request';
import { RepositoryResponse } from '../response/repository.response';
import { RequestBuilder } from '../request/request.builder';
import { Injectable, Injector, Type } from '@angular/core';
import { ResponseBuilder } from '../response/response.builder';
import { BuilderParam } from '../configuration/resource-param.configuration';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { RepositoryDriver } from '../driver/repository.driver';
import get from 'lodash.get';

@Injectable()
export class RequestManager {

  public constructor(protected readonly injector: Injector) {
  }

  public execute(context: RequestManagerContext): Observable<any> {
    const driver: RepositoryDriver = context.driver;
    const configuration: ConfigurationContextProvider = context.configuration;
    const requestBuilderParam: BuilderParam<RequestBuilder> = configuration.getConfiguration('requestBuilder');
    const requestBuilder: RequestBuilder = this.injector.get(get(requestBuilderParam, 'builder', requestBuilderParam));
    const responseBuilder: ResponseBuilder = this.injector.get(this.getResponseBuilderType(configuration));

    return requestBuilder.build(context).pipe(
      switchMap((request: RepositoryRequest) => driver.execute(request)),
      switchMap((response: RepositoryResponse) => responseBuilder.build(response, context))
    );
  }

  // TODO @RMA share with requestBuilder
  protected getResponseBuilderType(configuration: ConfigurationContextProvider): Type<ResponseBuilder> {
    const responseBuilderParam: BuilderParam<ResponseBuilder> = configuration.getConfiguration('responseBuilder');

    return get(responseBuilderParam, 'builder', responseBuilderParam);
  }
}
