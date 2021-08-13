import { FirebaseRepositoryResponse } from './firebase-repository.response';
import { RepositoryRequest } from '@witty-services/ngx-repository';

export class FirebaseEmptyRepositoryResponse implements FirebaseRepositoryResponse {

  public constructor(private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return null;
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

