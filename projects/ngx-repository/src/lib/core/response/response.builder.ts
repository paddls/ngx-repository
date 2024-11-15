import { RepositoryResponse } from './repository.response';
import { Observable, of } from 'rxjs';
import { RequestManagerContext } from '../manager/request-manager.context';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { Injectable, Injector, Type } from '@angular/core';
import { ResponseProcessor } from './processor/response.processor';
import { BuilderParam } from '../configuration/resource-param.configuration';
import { BodyResponseProcessor } from './processor/body.response-processor';
import { DenormalizeResponseProcessor } from './processor/denormalize-response.processor';
import { PathColumnResponseProcessor } from './processor/path-column-response.processor';
import { OriginalQueryResponseProcessor } from './processor/original-query-response.processor';
import { ResponseBuilderParam } from './response-builder.param';
import { ResponseProcessorWithParams } from './response-processor-with.params';
import { ResponseProcessorToken } from './response-processor.token';
import { isFunction } from '../common/utils/is-function';
import { isObject } from '../common/utils/is-object';
import { get } from '../common/utils/get';

@Injectable()
export class ResponseBuilder {

  public constructor(protected readonly injector: Injector) {
  }

  public static withParams(params: ResponseBuilderParam = {}): BuilderParam<ResponseBuilder> {
    const responseProcessors: ResponseProcessorToken[] = [
      ...(params.preResponseProcessors || []),
      ...(params.bodyResponseProcessors || [BodyResponseProcessor]),
      DenormalizeResponseProcessor,
      PathColumnResponseProcessor,
      OriginalQueryResponseProcessor,
      ...(params.postResponseProcessors || [])
    ];

    return {
      builder: ResponseBuilder,
      params: {
        responseProcessors
      }
    };
  }

  public build(response: RepositoryResponse, context: RequestManagerContext): Observable<any> {
    const responseProcessors: ResponseProcessor[] = this.getProcessors(context.configuration);

    let transformedResponse: any = null;

    responseProcessors.forEach((transformer: ResponseProcessor) => {
      transformedResponse = transformer.transform(transformedResponse, response, context);
    });

    return of(transformedResponse);
  }

  protected getProcessors(configuration: ConfigurationContextProvider): ResponseProcessor[] {
    const responseProcessorTokens: ResponseProcessorToken[] = [
      ...this.getParams(configuration)
    ];

    return responseProcessorTokens.map((token: ResponseProcessorToken) => this.getProcessor(token));
  }

  protected getProcessor(responseProcessorToken: ResponseProcessorToken): ResponseProcessor {
    if (isFunction(responseProcessorToken)) {
      return this.injector.get(responseProcessorToken as Type<ResponseProcessor>);
    } else {
      return this.injector.get((responseProcessorToken as ResponseProcessorWithParams).type);
    }
  }

  protected getParams(configuration: ConfigurationContextProvider): any {
    const builderParam: BuilderParam<ResponseBuilder> = configuration.findConfiguration('responseBuilder');

    if (isObject(builderParam)) {
      return get(builderParam, `params.responseProcessors`, null);
    } else {
      return null;
    }
  }
}
