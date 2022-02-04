import {FirestoreRepositoryResponse} from './firestore-repository.response';
import {RepositoryRequest} from '@witty-services/ngx-repository';
import {DocumentSnapshot} from 'firebase/firestore';

export class FirestoreDocumentRepositoryResponse implements FirestoreRepositoryResponse {

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

