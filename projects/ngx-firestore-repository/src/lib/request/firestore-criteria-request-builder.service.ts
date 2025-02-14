import { Observable, of } from 'rxjs';
import { Path, RequestManagerContext } from '@paddls/ngx-repository';
import { Injectable } from '@angular/core';
import { FirestoreCriteria } from './firestore.criteria';
import { FirestoreOperation } from './firestore.operation';
import { FirestoreCriteriaRepositoryRequest } from './firestore-criteria-repository.request';
import { FirestoreRequestBuilder } from './firestore-request-builder.service';

// @dynamic
@Injectable()
export class FirestoreCriteriaRequestBuilder extends FirestoreRequestBuilder {

  public build({ body, query, configuration }: RequestManagerContext): Observable<FirestoreCriteriaRepositoryRequest> {
    const operation: FirestoreOperation = configuration.getOperation() as FirestoreOperation;
    const path: Path = this.getPath(body, query, configuration);
    const normalizedBody: any = this.getBody(body);
    const criteria: FirestoreCriteria = this.getCriteria(query);

    return of(new FirestoreCriteriaRepositoryRequest(operation, path, normalizedBody, criteria));
  }

  protected getCriteria(query: any): FirestoreCriteria {
    return new FirestoreCriteria(query);
  }
}
