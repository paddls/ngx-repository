import {FirebaseRepositoryResponse} from './firebase-repository.response';
import {RepositoryRequest} from '@witty-services/ngx-repository';
import {DocumentReference} from 'firebase/firestore';

export class FirebaseDocumentReferenceRepositoryResponse implements FirebaseRepositoryResponse {

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

