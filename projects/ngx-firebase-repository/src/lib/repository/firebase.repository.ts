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
} from '@witty-services/ngx-repository';
import { Observable } from 'rxjs';
import { FirebaseRequestBuilder } from '../request/firebase-request.builder';
import { cloneDeep, first, merge } from 'lodash';
import { map, tap } from 'rxjs/operators';
import { FirebaseRepositoryDriver } from '../driver/firebase-repository.driver';
import { createFirebaseRepositoryConfiguration, FIREBASE_REPOSITORY_CONFIGURATION, FirebaseResourceConfiguration } from '../configuration/firebase-repository.configuration';
import { FirebaseCriteriaRequestBuilder } from '../request/firebase-criteria-request.builder';
import { BeforeFirebaseFindAllEvent } from './event/before-firebase-find-all.event';
import { AfterFirebaseFindAllEvent } from './event/after-firebase-find-all.event';
import { BeforeFirebaseFindOneEvent } from './event/before-firebase-find-one.event';
import { AfterFirebaseFindOneEvent } from './event/after-firebase-find-one.event';
import { BeforeFirebaseFindByIdEvent } from './event/before-firebase-find-by-id.event';
import { AfterFirebaseFindByIdEvent } from './event/after-firebase-find-by-id.event';
import { BeforeFirebaseCreateEvent } from './event/before-firebase-create.event';
import { AfterFirebaseCreateEvent } from './event/after-firebase-create.event';
import { BeforeFirebaseDeleteEvent } from './event/before-firebase-delete.event';
import { AfterFirebaseDeleteEvent } from './event/after-firebase-delete.event';
import { BeforeFirebaseUpdateEvent } from './event/before-firebase-update.event';
import { AfterFirebaseUpdateEvent } from './event/after-firebase-update.event';
import { BeforeFirebasePatchEvent } from './event/before-firebase-patch.event';
import { AfterFirebasePatchEvent } from './event/after-firebase-patch.event';
import { Inject, Type } from '@angular/core';
import { FIREBASE_RESOURCE_METADATA_KEY } from '../decorator/firebase-resource.decorator';

/**
 * @ignore
 */
@Repository<FirebaseResourceConfiguration>(null, {
  request: FirebaseRequestBuilder,
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
    request: FirebaseCriteriaRequestBuilder,
    responseBuilder: ResponseBuilder.withParams({
      postResponseProcessors: [PageResponseProcessor]
    })
  },
  findOne: {
    request: FirebaseCriteriaRequestBuilder
  }
})
export class FirebaseRepository<T, K = string> extends AbstractRepository<T> implements FindAllRepository,
  FindOneRepository,
  FindByIdRepository,
  CreateRepository,
  UpdateRepository,
  DeleteRepository,
  PatchRepository {

  public constructor(requestManager: RequestManager,
                     driver: FirebaseRepositoryDriver,
                     @Inject(FIREBASE_REPOSITORY_CONFIGURATION) configuration: ResourceConfiguration = {}) {
    super(requestManager, driver, configuration);
  }

  public findAll<R = Page<T>>(query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirebaseFindAllEvent(cloneDeep({query})));

    return this.execute(null, query, ['findAll', 'read']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirebaseFindAllEvent(cloneDeep({
        query,
        data
      }))))
    );
  }

  public findOne<R = T>(query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirebaseFindOneEvent(cloneDeep({query})));

    return this.execute(null, query, ['findOne', 'read']).pipe(
      map((result: any) => first(result) || null),
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirebaseFindOneEvent(cloneDeep({
        query,
        data
      }))))
    );
  }

  public findById<R = T, ID = K>(id: ID, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirebaseFindByIdEvent(cloneDeep({id, query})));

    return this.execute(null, new IdQuery(id, query), ['findById', 'read']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirebaseFindByIdEvent(cloneDeep({
        id,
        query,
        data
      }))))
    );
  }

  public create<O = T, R = K>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirebaseCreateEvent(cloneDeep({object, query})));

    return this.execute(object, query, ['create', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirebaseCreateEvent(cloneDeep({
        object,
        query,
        data
      }))))
    );
  }

  public delete<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirebaseDeleteEvent(cloneDeep({object, query})));

    return this.execute(object, query, ['delete', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirebaseDeleteEvent(cloneDeep({
        object,
        query,
        data
      }))))
    );
  }

  public update<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirebaseUpdateEvent(cloneDeep({object, query})));

    return this.execute(object, query, ['update', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirebaseUpdateEvent(cloneDeep({
        object,
        query,
        data
      }))))
    );
  }

  public patch<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeFirebasePatchEvent(cloneDeep({object, query})));

    return this.execute(object, query, ['patch', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterFirebasePatchEvent(cloneDeep({
        object,
        query,
        data
      }))))
    );
  }

  protected getResourceConfiguration(resourceType: Type<any>, configuration: ResourceConfiguration): ResourceConfiguration {
    const config: ResourceConfiguration = merge({}, configuration, Reflect.getMetadata(FIREBASE_RESOURCE_METADATA_KEY, resourceType));

    return createFirebaseRepositoryConfiguration(config);
  }
}
