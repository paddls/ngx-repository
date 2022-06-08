import {
  AbstractRepository,
  CreateRepository,
  DeleteRepository,
  FindAllRepository,
  FindByIdRepository,
  FindOneRepository,
  IdQuery,
  IdResponseProcessor,
  Page,
  PageResponseProcessor,
  PatchRepository,
  PublisherService,
  Repository,
  RequestManager,
  ResourceConfiguration,
  ResponseBuilder,
  UpdateRepository,
  VoidResponseProcessor
} from '@paddls/ngx-repository';
import { Observable } from 'rxjs';
import { FirestoreRequestBuilder } from '../request/firestore-request-builder.service';
import { map, tap } from 'rxjs/operators';
import { FirestoreRepositoryDriver } from '../driver/firestore-repository-driver.service';
import { createFirestoreRepositoryConfiguration, FIRESTORE_REPOSITORY_CONFIGURATION, FirestoreResourceConfiguration } from '../configuration/firestore-repository.configuration';
import { FirestoreCriteriaRequestBuilder } from '../request/firestore-criteria-request-builder.service';
import { BeforeFirestoreFindAllEvent } from './event/before-firestore-find-all.event';
import { AfterFirestoreFindAllEvent } from './event/after-firestore-find-all.event';
import { BeforeFirestoreFindOneEvent } from './event/before-firestore-find-one.event';
import { AfterFirestoreFindOneEvent } from './event/after-firestore-find-one.event';
import { BeforeFirestoreFindByIdEvent } from './event/before-firestore-find-by-id.event';
import { AfterFirestoreFindByIdEvent } from './event/after-firestore-find-by-id.event';
import { BeforeFirestoreCreateEvent } from './event/before-firestore-create.event';
import { AfterFirestoreCreateEvent } from './event/after-firestore-create.event';
import { BeforeFirestoreDeleteEvent } from './event/before-firestore-delete.event';
import { AfterFirestoreDeleteEvent } from './event/after-firestore-delete.event';
import { BeforeFirestoreUpdateEvent } from './event/before-firestore-update.event';
import { AfterFirestoreUpdateEvent } from './event/after-firestore-update.event';
import { BeforeFirestorePatchEvent } from './event/before-firestore-patch.event';
import { AfterFirestorePatchEvent } from './event/after-firestore-patch.event';
import { Inject, Type } from '@angular/core';
import { FIRESTORE_RESOURCE_METADATA_KEY } from '../decorator/firestore-resource.decorator';
import merge from 'lodash.merge';

/**
 * @ignore
 */
@Repository<FirestoreResourceConfiguration>(null, {
  requestBuilder: FirestoreRequestBuilder,
  responseBuilder: ResponseBuilder.withParams(),
  create: {
    responseBuilder: ResponseBuilder.withParams({
      postResponseProcessors: [IdResponseProcessor]
    })
  },
  write: {
    responseBuilder: ResponseBuilder.withParams({
      postResponseProcessors: [VoidResponseProcessor]
    })
  },
  findAll: {
    requestBuilder: FirestoreCriteriaRequestBuilder,
    responseBuilder: ResponseBuilder.withParams({
      postResponseProcessors: [PageResponseProcessor]
    })
  },
  findOne: {
    requestBuilder: FirestoreCriteriaRequestBuilder
  }
})
export class FirestoreRepository<T, K = string> extends AbstractRepository<T> implements FindAllRepository,
  FindOneRepository,
  FindByIdRepository,
  CreateRepository,
  UpdateRepository,
  DeleteRepository,
  PatchRepository {

  public constructor(requestManager: RequestManager,
                     driver: FirestoreRepositoryDriver,
                     @Inject(FIRESTORE_REPOSITORY_CONFIGURATION) configuration: ResourceConfiguration = {}) {
    super(requestManager, driver, configuration);
  }

  public findAll<R = Page<T>>(query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirestoreFindAllEvent({query}));

    return this.execute(null, query, ['findAll', 'read']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirestoreFindAllEvent({
        query,
        data
      })))
    );
  }

  public findOne<R = T>(query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirestoreFindOneEvent({query}));

    return this.execute(null, query, ['findOne', 'read']).pipe(
      map((result: any) => result?.[0] || null),
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirestoreFindOneEvent({
        query,
        data
      })))
    );
  }

  public findById<R = T, ID = K>(id: ID, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirestoreFindByIdEvent({id, query}));

    return this.execute(null, new IdQuery(id, query), ['findById', 'read']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirestoreFindByIdEvent({
        id,
        query,
        data
      })))
    );
  }

  public create<O = T, R = K>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirestoreCreateEvent({object, query}));

    return this.execute(object, query, ['create', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirestoreCreateEvent({
        object,
        query,
        data
      })))
    );
  }

  public delete<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirestoreDeleteEvent({object, query}));

    return this.execute(object, query, ['delete', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirestoreDeleteEvent({
        object,
        query,
        data
      })))
    );
  }

  public update<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirestoreUpdateEvent({object, query}));

    return this.execute(object, query, ['update', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirestoreUpdateEvent({
        object,
        query,
        data
      })))
    );
  }

  public patch<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirestorePatchEvent({object, query}));

    return this.execute(object, query, ['patch', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirestorePatchEvent({
        object,
        query,
        data
      })))
    );
  }

  protected getResourceConfiguration(resourceType: Type<any>, configuration: ResourceConfiguration): ResourceConfiguration {
    const config: ResourceConfiguration = merge({}, configuration, Reflect.getMetadata(FIRESTORE_RESOURCE_METADATA_KEY, resourceType));

    return createFirestoreRepositoryConfiguration(config);
  }
}
