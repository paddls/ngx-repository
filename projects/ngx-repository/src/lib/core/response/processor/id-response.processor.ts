import { Injectable, Type } from '@angular/core';
import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { ResponseProcessor } from './response.processor';
import { ID_METADATA_KEY } from '../../decorator/id.decorator';

@Injectable()
export class IdResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse, {configuration}: RequestManagerContext): any {
    const resourceType: Type<any> = configuration.getConfiguration('responseType')();
    const idField: string = Reflect.getMetadata(ID_METADATA_KEY, resourceType.prototype);

    if (idField && response) {
      return response[idField];
    }

    return null;
  }
}
