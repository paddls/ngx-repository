import { Observable, timer } from 'rxjs';
import { hardCache } from '@paddls/rxjs-common';
import { takeUntil } from 'rxjs/operators';
import {
  HardCacheContext,
  HardCacheContextConfiguration
} from '../configuration/context/hard-cache-context.configuration';
import { isObject } from '../common/utils/is-object';

/**
 * @ignore
 */
export const HARD_CACHE_METADATA_KEY: string = 'hardCache';

export function HardCache(hardCacheContext?: HardCacheContext | number): any {
  return (target: object, propertyKey: string) => {
    let hardCacheContextConfiguration: HardCacheContextConfiguration = {
      propertyKey,
      expires: null
    };

    if (!!hardCacheContext) {
      if (isObject(hardCacheContext)) {
        hardCacheContextConfiguration = {
          ...hardCacheContextConfiguration,
          ...(hardCacheContext as HardCacheContext)
        };
      } else {
        hardCacheContextConfiguration.expires = hardCacheContext as number;
      }
    }

    Reflect.defineMetadata(HARD_CACHE_METADATA_KEY, hardCacheContextConfiguration, target, propertyKey);
  };
}

export function setHardCache<T>(obs$: Observable<T>, target: any, propertyKey: string): Observable<T> {
  if (!hasHardCache(target, propertyKey)) {
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
