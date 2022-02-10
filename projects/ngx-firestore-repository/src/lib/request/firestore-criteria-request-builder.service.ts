import { Observable, of } from 'rxjs';
import { Path, RequestManagerContext } from '@paddls/ngx-repository';
import { Inject, Injectable } from '@angular/core';
import { FIRESTORE_APP } from '../ngx-firestore-repository.module.di';
import { FirestoreCriteria } from './firestore.criteria';
import { FirestoreOperation } from './firestore.operation';
import { FirestoreNormalizer } from '../normalizer/firestore.normalizer';
import { FirestoreCriteriaRepositoryRequest } from './firestore-criteria-repository.request';
import { FirestoreRequestBuilder } from './firestore-request-builder.service';
import { Firestore } from 'firebase/firestore';

// @dynamic
@Injectable()
export class FirestoreCriteriaRequestBuilder extends FirestoreRequestBuilder {

  public constructor(normalizer: FirestoreNormalizer,
                     @Inject(FIRESTORE_APP) firestore: Firestore) {
    super(normalizer, firestore);
  }

  public build({body, query, configuration}: RequestManagerContext): Observable<FirestoreCriteriaRepositoryRequest> {
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
