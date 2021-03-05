import {RequestCacheRegistry} from './request-cache.registry';
import {Observable, of} from 'rxjs';
import objectHash from 'object-hash';
import {AbstractRepository} from '../../repository/abstractRepository';

describe('RequestCacheRegistry', () => {

  beforeEach(() => {
    RequestCacheRegistry.cacheRegistry.clear();
  });

  describe('#addCache', () => {

    it('should add repository if not existing in cache', () => {
      const repository: any = {};
      const query: any = {};
      const obs$: Observable<any> = of({});

      expect(RequestCacheRegistry.cacheRegistry.has(repository)).toBe(false);
      RequestCacheRegistry.addCache(repository, query, obs$);
      expect(RequestCacheRegistry.cacheRegistry.has(repository)).toBe(true);
      expect(RequestCacheRegistry.cacheRegistry.get(repository).get(objectHash(query))).toBe(obs$);
    });

    it('should add a new obs behind the repository and query into cache', () => {
      const repository: AbstractRepository<any> = {} as AbstractRepository<any>;
      const map: Map<string, Observable<any>> = new Map<string, Observable<any>>();
      RequestCacheRegistry.cacheRegistry.set(repository, map);

      const query: any = {};
      const obs$: Observable<any> = of({});

      expect(RequestCacheRegistry.cacheRegistry.has(repository)).toBe(true);
      RequestCacheRegistry.addCache(repository, query, obs$);
      expect(map.get(objectHash(query))).toBe(obs$);
    });
  });

  describe('#findCache', () => {

    it('should return null is instance is not in cache', () => {
      const repository: AbstractRepository<any> = {} as AbstractRepository<any>;
      const query: any = {};
      expect(RequestCacheRegistry.findCache(repository, query)).toBeNull();
    });

    it('should return the obs behind repository and query hash in cache', () => {
      const repository: AbstractRepository<any> = {} as AbstractRepository<any>;
      const query: any = {};
      const map: Map<string, Observable<any>> = new Map<string, Observable<any>>();
      const obs$: Observable<any> = of({});

      RequestCacheRegistry.cacheRegistry.set(repository, map);
      map.set(objectHash(query), obs$);
      expect(RequestCacheRegistry.findCache(repository, query)).toBe(obs$);
    });
  });
});
