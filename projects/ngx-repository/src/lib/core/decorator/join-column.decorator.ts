import { Observable } from 'rxjs';
import { get } from 'lodash';
import { getSoftCacheContextConfiguration, hasSoftCache, setSoftCache } from './soft-cache.decorator';
import { CacheScope } from '../common/decorator/cache-scope.enum';
import { RequestCacheRegistry } from '../common/decorator/request-cache.registry';
import { InstanceCacheRegistry } from '../common/decorator/instance-cache.registry';
import { getHardCacheContextConfiguration, hasHardCache, setHardCache } from './hard-cache.decorator';
import { FindByIdRepository } from '../repository/find-by-id.repository';
import {
  JoinColumnContext,
  JoinColumnContextConfiguration
} from '../configuration/context/join-column-context.configuration';
import { HardCacheContextConfiguration } from '../configuration/context/hard-cache-context.configuration';
import { SoftCacheContextConfiguration } from '../configuration/context/soft-cache-context.configuration';
import { NgxRepositoryService } from '../../ngx-repository.service';

/**
 * @ignore
 */
export const JOIN_COLUMN_METADATA_KEY: string = 'joinColumns';

/**
 * @ignore
 */
export const JOIN_COLUMN_OBS_METADATA_KEY: string = 'joinColumnObs';

export function JoinColumn<T>(joinColumnContext: JoinColumnContext<T>): any {
  return (target: object, propertyKey: string) => {
    const joinColumnContextConfiguration: JoinColumnContextConfiguration = { propertyKey, ...joinColumnContext };
    Reflect.defineMetadata(JOIN_COLUMN_METADATA_KEY, joinColumnContextConfiguration, target, propertyKey);

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): Observable<any> {
        if (Reflect.hasOwnMetadata(JOIN_COLUMN_OBS_METADATA_KEY, this, propertyKey)) {
          return Reflect.getOwnMetadata(JOIN_COLUMN_OBS_METADATA_KEY, this, propertyKey);
        }

        const obs$: Observable<any> = makeJoinColumnSoftCached<T>(this, propertyKey, joinColumnContext)
          || makeJoinColumnHardCached<T>(this, propertyKey, joinColumnContext)
          || makeJoinColumn<T>(this, joinColumnContext);

        Reflect.defineMetadata(JOIN_COLUMN_OBS_METADATA_KEY, obs$, this, propertyKey);

        return obs$;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}

function makeJoinColumnSoftCached<T>(target: any, propertyKey: string, joinColumnContext: JoinColumnContext<T>): Observable<any> {
  if (!hasSoftCache(target, propertyKey)) {
    return null;
  }

  const softCacheContextConfiguration: SoftCacheContextConfiguration = getSoftCacheContextConfiguration(target, propertyKey);
  let obs$: Observable<any> = null;

  switch (softCacheContextConfiguration.scope) {
    case CacheScope.REQUEST:
      obs$ = RequestCacheRegistry.findCache<T>(
        NgxRepositoryService.getInstance().getRepository(joinColumnContext.resourceType(), joinColumnContext.repository ? joinColumnContext.repository() : null),
        get(target, joinColumnContext.attribute, null)
      );

      if (!obs$) {
        obs$ = setSoftCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);
        RequestCacheRegistry.addCache<T>(
          NgxRepositoryService.getInstance().getRepository(joinColumnContext.resourceType(), joinColumnContext.repository ? joinColumnContext.repository() : null),
          get(target, joinColumnContext.attribute, null),
          obs$
        );
      }

      break;

    case CacheScope.INSTANCE:
      obs$ = InstanceCacheRegistry.findCache<T>(
        target,
        get(target, joinColumnContext.attribute, null)
      );

      if (!obs$) {
        obs$ = setSoftCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);
        InstanceCacheRegistry.addCache<T>(
          target,
          get(target, joinColumnContext.attribute, null),
          obs$
        );
      }

      break;

    case CacheScope.FIELD:
      obs$ = setSoftCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);

      break;
  }

  return obs$;
}

function makeJoinColumnHardCached<T>(target: any, propertyKey: string, joinColumnContext: JoinColumnContext<T>): Observable<any> {
  if (!hasHardCache(target, propertyKey)) {
    return null;
  }

  const hardCacheContextConfiguration: HardCacheContextConfiguration = getHardCacheContextConfiguration(target, propertyKey);
  let obs$: Observable<any> = null;

  switch (hardCacheContextConfiguration.scope) {
    case CacheScope.REQUEST:
      obs$ = RequestCacheRegistry.findCache<T>(
        NgxRepositoryService.getInstance().getRepository(joinColumnContext.resourceType(), joinColumnContext.repository ? joinColumnContext.repository() : null),
        get(target, joinColumnContext.attribute, null)
      );

      if (!obs$) {
        obs$ = setHardCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);
        RequestCacheRegistry.addCache<T>(
          NgxRepositoryService.getInstance().getRepository(joinColumnContext.resourceType(), joinColumnContext.repository ? joinColumnContext.repository() : null),
          get(target, joinColumnContext.attribute, null),
          obs$
        );
      }

      break;

    case CacheScope.INSTANCE:
      obs$ = InstanceCacheRegistry.findCache<T>(
        target,
        get(target, joinColumnContext.attribute, null)
      );

      if (!obs$) {
        obs$ = setHardCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);
        InstanceCacheRegistry.addCache<T>(
          target,
          get(target, joinColumnContext.attribute, null),
          obs$
        );
      }

      break;

    case CacheScope.FIELD:
      obs$ = setHardCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);

      break;
  }

  return obs$;
}

function makeJoinColumn<T>(target: any, joinColumnContext: JoinColumnContext<T>): Observable<any> {
  const repository: FindByIdRepository = NgxRepositoryService.getInstance()
    .getRepository(joinColumnContext.resourceType(), joinColumnContext.repository ? joinColumnContext.repository() : null) as any;

  return repository.findById(get(target, joinColumnContext.attribute, null));
}
