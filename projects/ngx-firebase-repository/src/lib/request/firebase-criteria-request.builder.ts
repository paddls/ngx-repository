import { Observable, of } from 'rxjs';
import { Path, RequestManagerContext } from '@witty-services/ngx-repository';
import { Inject, Injectable } from '@angular/core';
import firebase from 'firebase';
import { FIRESTORE_APP } from '../ngx-firebase-repository.module.di';
import { FirebaseCriteria } from './firebase.criteria';
import { FirebaseOperation } from './firebase.operation';
import { FirebaseNormalizer } from '../normalizer/firebase.normalizer';
import { FirebaseCriteriaRepositoryRequest } from './firebase-criteria-repository.request';
import { FirebaseRequestBuilder } from './firebase-request.builder';
import Firestore = firebase.firestore.Firestore;

// @dynamic
@Injectable()
export class FirebaseCriteriaRequestBuilder extends FirebaseRequestBuilder {

  public constructor(normalizer: FirebaseNormalizer,
                     @Inject(FIRESTORE_APP) firestore: Firestore) {
    super(normalizer, firestore);
  }

  public build({ body, query, configuration }: RequestManagerContext): Observable<FirebaseCriteriaRepositoryRequest> {
    const operation: FirebaseOperation = configuration.getOperation() as FirebaseOperation;
    const path: Path = this.getPath(body, query, configuration);
    const normalizedBody: any = this.getBody(body);
    const criteria: FirebaseCriteria = this.getCriteria(query);

    return of(new FirebaseCriteriaRepositoryRequest(operation, path, normalizedBody, criteria));
  }

  protected getCriteria(query: any): FirebaseCriteria {
    return new FirebaseCriteria(query);
  }
}
