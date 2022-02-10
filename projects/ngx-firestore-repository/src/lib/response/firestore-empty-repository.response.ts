import { FirestoreRepositoryResponse } from './firestore-repository.response';
import { RepositoryRequest } from '@paddls/ngx-repository';

export class FirestoreEmptyRepositoryResponse implements FirestoreRepositoryResponse {

  public constructor(private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return null;
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

