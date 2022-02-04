import { Injectable } from '@angular/core';
import { RepositoryResponse } from '../repository.response';
import { ResponseProcessor } from './response.processor';

@Injectable()
export class BodyResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse): any {
    return origin.getBody();
  }
}
