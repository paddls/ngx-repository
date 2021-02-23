import { RequestManagerContext } from './request-manager.context';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RepositoryRequest } from '../request/repository.request';
import { RepositoryResponse } from '../response/repository.response';
import { RequestBuilder } from '../request/request.builder';
import { Injector, Type } from '@angular/core';
import { ResponseBuilder } from '../response/response.builder';
import { BuilderParam } from '../configuration/resource-param.configuration';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { RepositoryDriver } from '../driver/repository.driver';
import { ResponseProcessor } from '../response/transformer/response.processor';
import { PathColumnResponseProcessor } from '../response/transformer/path-column-response.processor';
import { OriginalQueryResponseProcessor } from '../response/transformer/original-query-response.processor';

export class RequestManager {

  public constructor(protected readonly injector: Injector,
                     private readonly pathColumnResponseProcessor: PathColumnResponseProcessor,
                     private readonly originalQueryResponseProcessor: OriginalQueryResponseProcessor) {
  }

  public execute(context: RequestManagerContext): Observable<any> {
    const driver: RepositoryDriver = context.driver;
    const configuration: ConfigurationContextProvider = context.configuration;
    const requestBuilderParam: BuilderParam<RequestBuilder> = configuration.getConfiguration('request');
    const requestBuilder: RequestBuilder = this.injector.get(get(requestBuilderParam, 'builder', requestBuilderParam)());

    const responseBuilder: ResponseBuilder = this.injector.get(this.getResponseBuilderType(configuration));
    const responseProcessors: ResponseProcessor[] = [
      ...this.getResponseProcessor(responseBuilder, configuration),
      this.pathColumnResponseProcessor,
      this.originalQueryResponseProcessor
    ];

    return requestBuilder.build(context).pipe(
      switchMap((request: RepositoryRequest) => driver.execute(request)),
      switchMap((response: RepositoryResponse) => responseBuilder.build(response, context).pipe(
        map((result: any) => this.handleResponseProcessor(responseProcessors, result, response, context))
      ))
    );
  }

  protected handleResponseProcessor(responseProcessors: ResponseProcessor[], result: any, response: RepositoryResponse, context: RequestManagerContext): any {
    let transformedResponse: any = response.getBody();

    responseProcessors.forEach((transformer: ResponseProcessor) => {
      transformedResponse = transformer.transform(transformedResponse, response, context);
    });

    return transformedResponse;
  }

  protected getResponseBuilderType(configuration: ConfigurationContextProvider): Type<ResponseBuilder> {
    const responseBuilderParam: BuilderParam<ResponseBuilder> = configuration.getConfiguration('response');

    return get(responseBuilderParam, 'builder', responseBuilderParam)();
  }

  protected getResponseProcessor(responseBuilder: ResponseBuilder, configuration: ConfigurationContextProvider): ResponseProcessor[] {
    return responseBuilder.getProcessors(configuration)
      .map((processorType: Type<ResponseProcessor>) => this.injector.get(processorType));
  }
}
