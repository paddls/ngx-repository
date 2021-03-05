import { Injectable } from '@angular/core';
import { isArray } from 'lodash';
import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { ResponseProcessor } from './response.processor';

/**
 * @ignore
 */
export const ORIGINAL_QUERY_METADATA_KEY: string = 'originalQuery';

@Injectable()
export class OriginalQueryResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse, { query }: RequestManagerContext): any {
    if (query) {
      if (isArray(response)) {
        response.forEach((item: any) => Reflect.defineMetadata(ORIGINAL_QUERY_METADATA_KEY, query, item));
      } else {
        Reflect.defineMetadata(ORIGINAL_QUERY_METADATA_KEY, query, response);
      }
    }

    return response;
  }
}