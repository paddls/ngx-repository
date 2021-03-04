import {InstanceCacheRegistry} from './instance-cache.registry';
import {Observable, of} from 'rxjs';
import objectHash from 'object-hash';

describe('InstanceCacheRegistry', () => {

  beforeEach(() => {
    InstanceCacheRegistry.cacheRegistry.clear();
  });

  describe('#addCache', () => {

    it('should add instance if not existing in cache', () => {
      const instance: any = {};
      const query: any = {};
      const obs$: Observable<any> = of({});

      expect(InstanceCacheRegistry.cacheRegistry.has(instance)).toBe(false);
      InstanceCacheRegistry.addCache(instance, query, obs$);
      expect(InstanceCacheRegistry.cacheRegistry.has(instance)).toBe(true);
      expect(InstanceCacheRegistry.cacheRegistry.get(instance).get(objectHash(query))).toBe(obs$);
    });

    it('should add a new obs to the instance cache', () => {
      const instance: any = {};
      const map: Map<string, Observable<any>> = new Map<string, Observable<any>>();
      InstanceCacheRegistry.cacheRegistry.set(instance, map);

      const query: any = {};
      const obs$: Observable<any> = of({});

      expect(InstanceCacheRegistry.cacheRegistry.has(instance)).toBe(true);
      InstanceCacheRegistry.addCache(instance, query, obs$);
      expect(map.get(objectHash(query))).toBe(obs$);
    });
  });
});
