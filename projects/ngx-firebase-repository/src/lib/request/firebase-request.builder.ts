import { Observable, of } from 'rxjs';
import {
  ConfigurationContextProvider,
  Path,
  RepositoryRequest,
  RequestBuilder,
  RequestManagerContext
} from '@witty-services/ngx-repository';
import { FirebaseRepositoryRequest } from './firebase-repository.request';
import { Inject, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FIRESTORE_APP } from '../ngx-firebase-repository.module.di';
import { FirebaseCriteria } from './firebase.criteria';
import { FirebaseRepositoryParamConfiguration } from '../configuration/firebase-repository-param.configuration';
import { FirebaseOperation } from './firebase.operation';
import { FirebaseNormalizer } from '../normalizer/firebase.normalizer';
import Firestore = firebase.firestore.Firestore;

// TODO @RMA decline list / get / update & create / delete RequestBuilder
// TODO @TNI response builder or request processor ?
@Injectable()
export class FirebaseRequestBuilder implements RequestBuilder {

  public constructor(private readonly normalizer: FirebaseNormalizer,
                     @Inject(FIRESTORE_APP) private readonly firestore: Firestore) {
  }

  public build({ body, query, configuration }: RequestManagerContext): Observable<RepositoryRequest> {
    const operation: FirebaseOperation = configuration.getOperation() as FirebaseOperation;
    const path: Path = this.getPath(body, query, configuration);
    const normalizedBody: any = this.getBody(body);
    const criteria: FirebaseCriteria = this.getCriteria(query);

    return of(new FirebaseRepositoryRequest(operation, path, normalizedBody, criteria));
  }

  protected getPath(body: any, query: any, configuration: ConfigurationContextProvider): Path {
    const path: string = configuration.getConfiguration<FirebaseRepositoryParamConfiguration>('path');

    return new Path(body, query, path);
  }

  protected getBody(body: any): any {
    return body ? this.normalizer.normalize(body) : null;
  }

  protected getCriteria(query: any): FirebaseCriteria {
    return new FirebaseCriteria(query);
  }
}
