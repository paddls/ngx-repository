import { Observable } from 'rxjs';
import objectHash from 'object-hash';

/**
 * @ignore
 */
export class InstanceCacheRegistry {

  public static readonly cacheRegistry: Map<any, Map<string, Observable<any>>> = new Map();

  public static addCache<T>(instance: any, query: any, obs$: Observable<any>): void {
    if (!InstanceCacheRegistry.cacheRegistry.has(instance)) {
      InstanceCacheRegistry.cacheRegistry.set(instance, new Map());
    }

    InstanceCacheRegistry.cacheRegistry.get(instance).set(objectHash(query), obs$);
  }

  public static findCache<T>(instance: any, query: any): Observable<any> {
    if (!InstanceCacheRegistry.cacheRegistry.has(instance)) {
      return null;
    }

    return InstanceCacheRegistry.cacheRegistry.get(instance).get(objectHash(query));
  }
}
