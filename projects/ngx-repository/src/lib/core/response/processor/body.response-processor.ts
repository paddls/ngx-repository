import { Injectable } from '@angular/core';
import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { ResponseProcessor } from './response.processor';

@Injectable()
export class BodyResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse, { configuration }: RequestManagerContext): any {
    return origin.getBody();
  }
}
