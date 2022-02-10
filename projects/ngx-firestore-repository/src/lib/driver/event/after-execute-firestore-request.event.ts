import {FirestoreRepositoryRequest} from '../../request/firestore-repository.request';
import {FirestoreRepositoryResponse} from '../../response/firestore-repository.response';
import {InternalEvent} from '@paddls/ngx-repository';

export class AfterExecuteFirestoreRequestEvent implements InternalEvent {

  public request: FirestoreRepositoryRequest;

  public response: FirestoreRepositoryResponse;

  public constructor(data: Partial<AfterExecuteFirestoreRequestEvent> = {}) {
    Object.assign(this, data);
  }
}
