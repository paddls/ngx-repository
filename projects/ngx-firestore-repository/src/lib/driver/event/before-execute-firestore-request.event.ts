import { FirestoreRepositoryRequest } from '../../request/firestore-repository.request';
import { InternalEvent } from '@paddls/ngx-repository';

export class BeforeExecuteFirestoreRequestEvent implements InternalEvent {

  public request: FirestoreRepositoryRequest;

  public constructor(data: Partial<BeforeExecuteFirestoreRequestEvent> = {}) {
    Object.assign(this, data);
  }
}
