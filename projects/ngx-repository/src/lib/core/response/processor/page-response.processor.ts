import { Injectable, Type } from '@angular/core';
import { Page } from '../../model/page';
import { ResponseProcessor } from './response.processor';
import { ResponseBuilder } from '../response.builder';
import { BuilderParam } from '../../configuration/resource-param.configuration';
import { BodyResponseProcessor } from './body.response-processor';

@Injectable()
export class PageResponseProcessor implements ResponseProcessor {

  public static withParams(pageResponseProcessor: Type<ResponseProcessor> = PageResponseProcessor): BuilderParam<ResponseBuilder> {
    return ResponseBuilder.withParams({
      bodyResponseProcessors: [
        BodyResponseProcessor,
        pageResponseProcessor
      ]
    });
  }

  public transform(response: any): any {
    return Array.isArray(response) ? Page.build(response) : response;
  }
}
