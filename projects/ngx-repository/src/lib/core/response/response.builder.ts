import { RepositoryResponse } from './repository.response';
import { Observable, of } from 'rxjs';
import { RequestManagerContext } from '../manager/request-manager.context';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { Injectable, Injector, Type } from '@angular/core';
import { ResponseProcessor } from './processor/response.processor';
import { BuilderParam } from '../configuration/resource-param.configuration';
import { get, isFunction, isObject, merge } from 'lodash';
import { BodyResponseProcessor } from './processor/body.response-processor';
import { DenormalizeResponseProcessor } from './processor/denormalize-response.processor';
import { PathColumnResponseProcessor } from './processor/path-column-response.processor';
import { OriginalQueryResponseProcessor } from './processor/original-query-response.processor';

export type ResponseProcessorToken = Type<ResponseProcessor> | ResponseProcessorWithParams;

export interface ResponseProcessorWithParams {
  type: Type<ResponseProcessor>;
  params: any;
}

export interface ResponseBuilderParam {
  preResponseProcessors?: ResponseProcessorToken[];
  coreResponseProcessors?: ResponseProcessorToken[];
  postResponseProcessors?: ResponseProcessorToken[];
}

@Injectable()
export class ResponseBuilder {

  public constructor(protected readonly injector: Injector) {
  }

  public static withParams(params: ResponseBuilderParam = {}): BuilderParam<ResponseBuilder> {
    return {
      builder: ResponseBuilder,
      params: merge({}, {
        preResponseProcessors: [
          BodyResponseProcessor
        ],
        coreResponseProcessors: [
          DenormalizeResponseProcessor,
          PathColumnResponseProcessor,
          OriginalQueryResponseProcessor
        ],
        postResponseProcessors: []
      }, params)
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
      ...this.getParams('preResponseProcessors', configuration),
      ...this.getParams('coreResponseProcessors', configuration),
      ...this.getParams('postResponseProcessors', configuration)
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

  protected getParams(key: keyof ResponseBuilderParam, configuration: ConfigurationContextProvider): any {
    const builderParam: BuilderParam<ResponseBuilder> = configuration.findConfiguration('responseBuilder');

    if (isObject(builderParam)) {
      return get(builderParam, `params.${ key }`, null);
    } else {
      return null;
    }
  }
}
