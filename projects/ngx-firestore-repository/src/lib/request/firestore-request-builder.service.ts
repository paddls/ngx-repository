import { Observable, of } from 'rxjs';
import {
  AfterNormalizeEvent,
  BeforeNormalizeEvent,
  ConfigurationContextProvider,
  Path,
  PublisherService,
  RequestBuilder,
  RequestManagerContext
} from '@paddls/ngx-repository';
import { FirestoreRepositoryRequest } from './firestore-repository.request';
import { inject, Injectable } from '@angular/core';
import { FIRESTORE_APP } from '../ngx-firestore-repository.module.di';
import { FirestoreRepositoryParamConfiguration } from '../configuration/firestore-repository-param.configuration';
import { FirestoreOperation } from './firestore.operation';
import { FirestoreNormalizer } from '../normalizer/firestore.normalizer';
import { Firestore } from 'firebase/firestore';

// @dynamic
@Injectable()
export class FirestoreRequestBuilder implements RequestBuilder {

  protected readonly normalizer = inject(FirestoreNormalizer);
  protected readonly firestore = inject<Firestore>(FIRESTORE_APP);

  public build({ body, query, configuration }: RequestManagerContext): Observable<FirestoreRepositoryRequest> {
    const operation: FirestoreOperation = configuration.getOperation() as FirestoreOperation;
    const path: Path = this.getPath(body, query, configuration);
    const normalizedBody: any = this.getBody(body);

    return of(new FirestoreRepositoryRequest(operation, path, normalizedBody));
  }

  protected getPath(body: any, query: any, configuration: ConfigurationContextProvider): Path {
    const path: string = configuration.getConfiguration<FirestoreRepositoryParamConfiguration>('path');

    return new Path(body, query, path, this.normalizer.getNormalizer());
  }

  protected getBody(body: any): any {
    if (!body) {
      return null;
    }

    PublisherService.getInstance()?.publish(new BeforeNormalizeEvent({ body }));
    const data: any = this.normalizer.normalize(body);
    PublisherService.getInstance()?.publish(new AfterNormalizeEvent({ body, data }));

    return data;
  }
}
