import { HttpRepositoryRequest } from '../../request/http-repository.request';
import { InternalEvent } from '@paddls/ngx-repository';

export class BeforeExecuteHttpRequestEvent implements InternalEvent {

  public request: HttpRepositoryRequest;

  public constructor(data: Partial<BeforeExecuteHttpRequestEvent> = {}) {
    Object.assign(this, data);
  }
}
