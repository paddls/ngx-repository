import { FirestoreRepositoryResponse } from './firestore-repository.response';
import { RepositoryRequest } from '@paddls/ngx-repository';
import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

export class FirestoreCollectionRepositoryResponse implements FirestoreRepositoryResponse {

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

