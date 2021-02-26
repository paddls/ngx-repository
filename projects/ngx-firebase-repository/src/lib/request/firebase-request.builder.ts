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
import { firestore as fs } from 'firebase';
import { FIRESTORE_APP } from '../ngx-firebase-repository.module.di';
import { FirebaseRepositoryParamConfiguration } from '../configuration/firebase-repository-param.configuration';
import { FirebaseOperation } from './firebase.operation';
import { FirebaseNormalizer } from '../normalizer/firebase.normalizer';
import Firestore = fs.Firestore;

// @dynamic
@Injectable()
export class FirebaseRequestBuilder implements RequestBuilder {

  public constructor(protected readonly normalizer: FirebaseNormalizer,
                     @Inject(FIRESTORE_APP) protected readonly firestore: Firestore) {
    // TODO @TNI response builder or request processor ?
  }

  public build({ body, query, configuration }: RequestManagerContext): Observable<RepositoryRequest> {
    const operation: FirebaseOperation = configuration.getOperation() as FirebaseOperation;
    const path: Path = this.getPath(body, query, configuration);
    const normalizedBody: any = this.getBody(body);

    return of(new FirebaseRepositoryRequest(operation, path, normalizedBody));
  }

  protected getPath(body: any, query: any, configuration: ConfigurationContextProvider): Path {
    const path: string = configuration.getConfiguration<FirebaseRepositoryParamConfiguration>('path');

    return new Path(body, query, path);
  }

  protected getBody(body: any): any {
    return body ? this.normalizer.normalize(body) : null;
  }
}