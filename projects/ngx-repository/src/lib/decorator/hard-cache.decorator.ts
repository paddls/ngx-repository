import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';
import {CacheScope} from '../common/decorator/cache-scope.enum';
import {Observable, timer} from 'rxjs';
import {hardCache} from '@witty-services/rxjs-common';
import {takeUntil} from 'rxjs/operators';
import {isObject} from 'util';

/**
 * @ignore
 */
export const HARD_CACHE_METADATA_KEY: string = 'hardCache';

export interface HardCacheContext {

  scope?: CacheScope;

  expires?: number;
}

/**
 * @ignore
 */
export interface HardCacheContextConfiguration extends HardCacheContext, PropertyKeyConfiguration {
}

export function HardCache(hardCacheContext?: HardCacheContext|CacheScope): any {
  return (target: object, propertyKey: string) => {
    let hardCacheContextConfiguration: HardCacheContextConfiguration = {
      propertyKey,
      scope: CacheScope.FIELD,
      expires: null
    };

    if (!!hardCacheContext) {
      if (isObject(hardCacheContext)) {
        hardCacheContextConfiguration = {
          ...hardCacheContextConfiguration,
          ...(hardCacheContext as HardCacheContext)
        };
      } else {
        hardCacheContextConfiguration = {
          ...hardCacheContextConfiguration,
          scope: hardCacheContext as CacheScope
        };
      }
    }

    Reflect.defineMetadata(HARD_CACHE_METADATA_KEY, hardCacheContextConfiguration, target, propertyKey);
  };
}

export function setHardCache<T>(obs$: Observable<T>, target: any, propertyKey: string): Observable<T> {
  if (!Reflect.hasMetadata(HARD_CACHE_METADATA_KEY, target, propertyKey)) {
    return obs$;
  }

  const hardCacheContextConfiguration: HardCacheContextConfiguration = Reflect.getMetadata(HARD_CACHE_METADATA_KEY, target, propertyKey);

  if (hardCacheContextConfiguration.expires != null) {
    obs$.pipe(
      takeUntil(timer(hardCacheContextConfiguration.expires))
    );
  }

  return obs$.pipe(
    hardCache()
  );
}

export function hasHardCache(target: any, propertyKey: string): boolean {
  return Reflect.hasMetadata(HARD_CACHE_METADATA_KEY, target, propertyKey);
}

export function getHardCacheContextConfiguration(target: any, propertyKey: string): HardCacheContextConfiguration {
  return Reflect.getMetadata(HARD_CACHE_METADATA_KEY, target, propertyKey);
}
