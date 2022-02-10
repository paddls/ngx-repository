import {FirestoreRepositoryResponse} from './firestore-repository.response';
import {RepositoryRequest} from '@paddls/ngx-repository';
import {DocumentReference} from 'firebase/firestore';

export class FirestoreDocumentReferenceRepositoryResponse implements FirestoreRepositoryResponse {

  public constructor(private readonly response: DocumentReference,
                     private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return {
      id: this.response.id
    };
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

