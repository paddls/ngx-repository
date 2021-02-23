import { Injectable } from '@angular/core';
import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { isArray } from 'lodash';
import { Page } from '../../model/page';
import { ResponseProcessor } from './response.processor';

@Injectable()
export class PageResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse, { configuration }: RequestManagerContext): any {
    return isArray(response) ? Page.build(response) : response;
  }
}