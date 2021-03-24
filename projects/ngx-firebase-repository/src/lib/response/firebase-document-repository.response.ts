import firebase from 'firebase';
import { FirebaseRepositoryResponse } from './firebase-repository.response';
import { RepositoryRequest } from '@witty-services/ngx-repository';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class FirebaseDocumentRepositoryResponse implements FirebaseRepositoryResponse {

  public constructor(private readonly response: DocumentSnapshot,
                     private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return {
      id: this.response.id,
      ...this.response.data()
    };
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

