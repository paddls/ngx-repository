import { HttpRepositoryDriver } from '../driver/http-repository.driver';
import { Observable } from 'rxjs';
import {
  AbstractRepository,
  CreateRepository,
  DeleteRepository,
  FindAllRepository,
  FindByIdRepository,
  FindOneRepository,
  getIdFromObject,
  IdQuery,
  IdResponseProcessor,
  InternalEvent,
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
import { HTTP_RESOURCE_METADATA_KEY } from '../decorator/http-resource.decorator';
import { filter, map, tap } from 'rxjs/operators';
import { HttpRequestBuilder } from '../request/http-request.builder';
import { BeforeHttpFindAllEvent } from './event/before-http-find-all.event';
import { AfterHttpFindAllEvent } from './event/after-http-find-all.event';
import { BeforeHttpFindOneEvent } from './event/before-http-find-one.event';
import { AfterHttpFindOneEvent } from './event/after-http-find-one.event';
import { BeforeHttpFindByIdEvent } from './event/before-http-find-by-id.event';
import { AfterHttpFindByIdEvent } from './event/after-http-find-by-id.event';
import { BeforeHttpCreateEvent } from './event/before-http-create.event';
import { AfterHttpCreateEvent } from './event/after-http-create.event';
import { AfterHttpDeleteEvent } from './event/after-http-delete.event';
import { BeforeHttpDeleteEvent } from './event/before-http-delete.event';
import { BeforeHttpUpdateEvent } from './event/before-http-update.event';
import { AfterHttpUpdateEvent } from './event/after-http-update.event';
import { BeforeHttpPatchEvent } from './event/before-http-patch.event';
import { AfterHttpPatchEvent } from './event/after-http-patch.event';
import { HTTP_LIVE_RESOURCE_METADATA_KEY } from '../decorator/http-live-resource.decorator';
import { refreshOn } from '@paddls/rxjs-common';
import { OnHttpResourceChange } from '../decorator/on-http-resource-change.decorator';
import { Inject, Type } from '@angular/core';
import { createHttpRepositoryConfiguration } from '../configuration/context/http-repository-context.configuration';
import { HTTP_REPOSITORY_CONFIGURATION } from '../configuration/http-repository.configuration';
import merge from 'lodash.merge';

@Repository(null, {
  requestBuilder: HttpRequestBuilder,
  responseBuilder: ResponseBuilder.withParams(),
  findAll: {
    responseBuilder: ResponseBuilder.withParams({
      postResponseProcessors: [
        PageResponseProcessor
      ]
    })
  },
  create: {
    responseBuilder: ResponseBuilder.withParams({
      postResponseProcessors: [
        IdResponseProcessor
      ]
    })
  },
  write: {
    responseBuilder: ResponseBuilder.withParams({
      postResponseProcessors: [
        VoidResponseProcessor
      ]
    })
  }
})
export class HttpRepository<T, K> extends AbstractRepository<T> implements FindAllRepository,
  FindOneRepository,
  FindByIdRepository,
  CreateRepository,
  UpdateRepository,
  DeleteRepository,
  PatchRepository {

  private onWrite$: Observable<InternalEvent>;

  public constructor(requestManager: RequestManager,
                     driver: HttpRepositoryDriver,
                     @Inject(HTTP_REPOSITORY_CONFIGURATION) configuration: ResourceConfiguration = {}) {
    super(requestManager, driver, configuration);

    if (this.isLiveResource()) {
      OnHttpResourceChange({
        type: () => this.resourceType,
        actions: ['write']
      })(this, 'onWrite$');
    }
  }

  public findAll<R = Page<T>>(query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeHttpFindAllEvent({
      type: this.resourceType,
      query
    }));

    let findAll$: Observable<R> = this.execute(null, query, ['findAll', 'read']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterHttpFindAllEvent({
        type: this.resourceType,
        query,
        data
      })))
    );

    if (this.isLiveResource()) {
      findAll$ = findAll$.pipe(refreshOn(this.onWrite$));
    }

    return findAll$;
  }

  public findOne<R = T>(query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeHttpFindOneEvent({
      type: this.resourceType,
      query
    }));

    let findOne$: Observable<R> = this.execute(null, query, ['findOne', 'read']).pipe(
      map((result: any) => result?.[0] || null),
      tap((data: R) => PublisherService.getInstance().publish(new AfterHttpFindOneEvent({
        type: this.resourceType,
        query,
        data
      })))
    );

    if (this.isLiveResource()) {
      let id: any = null;
      findOne$ = findOne$.pipe(
        tap((data: R) => id = getIdFromObject(data)),
        refreshOn(
          this.onWrite$.pipe(
            filter(AfterHttpUpdateEvent.isInstanceOf),
            filter((event: AfterHttpUpdateEvent<any, any>) => getIdFromObject(event.object) === id)
          ),
          this.onWrite$.pipe(
            filter(AfterHttpPatchEvent.isInstanceOf),
            filter((event: AfterHttpPatchEvent<any, any>) => getIdFromObject(event.object) === id)
          ),
          this.onWrite$.pipe(
            filter(AfterHttpDeleteEvent.isInstanceOf),
            filter((event: AfterHttpDeleteEvent<any, any>) => getIdFromObject(event.object) === id)
          )
        )
      );
    }

    return findOne$;
  }

  public findById<R = T, ID = K>(id: ID, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeHttpFindByIdEvent({
      type: this.resourceType,
      id,
      query
    }));

    let findById$: Observable<R> = this.execute(null, new IdQuery(id, query), ['findById', 'read']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterHttpFindByIdEvent({
        type: this.resourceType,
        id,
        query,
        data
      })))
    );

    if (this.isLiveResource()) {
      findById$ = findById$.pipe(
        refreshOn(
          this.onWrite$.pipe(
            filter(AfterHttpUpdateEvent.isInstanceOf),
            filter((event: AfterHttpUpdateEvent<any, any>) => getIdFromObject(event.object) === id)
          ),
          this.onWrite$.pipe(
            filter(AfterHttpPatchEvent.isInstanceOf),
            filter((event: AfterHttpPatchEvent<any, any>) => getIdFromObject(event.object) === id)
          ),
          this.onWrite$.pipe(
            filter(AfterHttpDeleteEvent.isInstanceOf),
            filter((event: AfterHttpDeleteEvent<any, any>) => getIdFromObject(event.object) === id)
          )
        )
      );
    }

    return findById$;
  }

  public create<O = T, R = K>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeHttpCreateEvent({
      type: this.resourceType,
      object,
      query
    }));

    return this.execute(object, query, ['create', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterHttpCreateEvent({
        type: this.resourceType,
        object,
        query,
        data
      })))
    );
  }

  public delete<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeHttpDeleteEvent({
      type: this.resourceType,
      object,
      query
    }));

    return this.execute(object, query, ['delete', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterHttpDeleteEvent({
        type: this.resourceType,
        object,
        query,
        data
      })))
    );
  }

  public update<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeHttpUpdateEvent({
      type: this.resourceType,
      object,
      query
    }));

    return this.execute(object, query, ['update', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterHttpUpdateEvent({
        type: this.resourceType,
        object,
        query,
        data
      })))
    );
  }

  public patch<O = T, R = void>(object: O, query?: any): Observable<R> {
    PublisherService.getInstance().publish(new BeforeHttpPatchEvent({
      type: this.resourceType,
      object,
      query
    }));

    return this.execute(object, query, ['patch', 'write']).pipe(
      tap((data: R) => PublisherService.getInstance().publish(new AfterHttpPatchEvent({
        type: this.resourceType,
        object,
        query,
        data
      })))
    );
  }

  protected getResourceConfiguration(resourceType: Type<any>, configuration: ResourceConfiguration): ResourceConfiguration {
    const config: ResourceConfiguration = merge({}, configuration, Reflect.getMetadata(HTTP_RESOURCE_METADATA_KEY, resourceType));

    return createHttpRepositoryConfiguration(config);
  }

  private isLiveResource(): boolean {
    return Reflect.getMetadata(HTTP_LIVE_RESOURCE_METADATA_KEY, this.resourceType) === true;
  }
}
