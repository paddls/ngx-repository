import { Observable } from 'rxjs';
import objectHash from 'object-hash';
import { Repository2 } from '../../repository/repository2';

export class RequestCacheRegistry {

  public static readonly cacheRegistry: Map<Repository2, Map<string, Observable<any>>> = new Map();

  public static addCache<T>(repository: Repository2, query: any, obs$: Observable<any>): void {
    if (!RequestCacheRegistry.cacheRegistry.has(repository)) {
      RequestCacheRegistry.cacheRegistry.set(repository, new Map());
    }

    RequestCacheRegistry.cacheRegistry.get(repository).set(objectHash(query), obs$);
  }

  public static findCache<T>(repository: Repository2, query: any): Observable<any> {
    if (!RequestCacheRegistry.cacheRegistry.has(repository)) {
      return null;
    }

    return RequestCacheRegistry.cacheRegistry.get(repository).get(objectHash(query));
  }
}
