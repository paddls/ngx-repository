import { Injectable } from '@angular/core';
import { ResponseProcessor } from './response.processor';

@Injectable()
export class VoidResponseProcessor implements ResponseProcessor {

  public transform(): any {
    return void 0;
  }
}
