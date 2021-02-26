import { firestore } from 'firebase';
import { FirebaseRepositoryResponse } from './firebase-repository.response';
import { RepositoryRequest } from '@witty-services/ngx-repository';
import QuerySnapshot = firestore.QuerySnapshot;
import DocumentSnapshot = firestore.DocumentSnapshot;

export class FirebaseCollectionRepositoryResponse implements FirebaseRepositoryResponse {

  public constructor(private readonly response: QuerySnapshot<any>,
                     private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return this.response.docs.map((item: DocumentSnapshot) => ({
      id: item.id,
      ...item.data()
    }));
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

