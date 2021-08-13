import firebase from 'firebase';
import { FirebaseRepositoryResponse } from './firebase-repository.response';
import { RepositoryRequest } from '@witty-services/ngx-repository';
import DocumentReference = firebase.firestore.DocumentReference;

export class FirebaseDocumentReferenceRepositoryResponse implements FirebaseRepositoryResponse {

  public constructor(private readonly response: DocumentReference,
                     private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return this.response.id;
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

