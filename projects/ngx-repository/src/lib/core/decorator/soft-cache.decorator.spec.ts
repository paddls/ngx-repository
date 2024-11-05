import { setSoftCache, SOFT_CACHE_METADATA_KEY, SoftCache } from './soft-cache.decorator';
import { Observable, of } from 'rxjs';

describe('SoftCacheDecorator', () => {

  describe('#SoftCache', () => {
    it('should put context configuration with null param on target', () => {
      const obj: any = {
        myProperty: ''
      };
      SoftCache()(obj, 'myProperty');

      expect(Reflect.getMetadata(SOFT_CACHE_METADATA_KEY, obj, 'myProperty')).toEqual({
        propertyKey: 'myProperty',
        expires: null
      });
    });

    it('should put context with just expires param on target', () => {
      const obj: any = {
        myProperty: ''
      };
      SoftCache(3)(obj, 'myProperty');

      expect(Reflect.getMetadata(SOFT_CACHE_METADATA_KEY, obj, 'myProperty')).toEqual({
        propertyKey: 'myProperty',
        expires: 3
      });
    });

    it('should put context with just expires param in object context on target', () => {
      const obj: any = {
        myProperty: ''
      };
      SoftCache({
        expires: 4
      })(obj, 'myProperty');

      expect(Reflect.getMetadata(SOFT_CACHE_METADATA_KEY, obj, 'myProperty')).toEqual({
        propertyKey: 'myProperty',
        expires: 4
      });
    });
  });

  describe('#setSoftCache', () => {

    it('should just return the original observable if there is no soft cache metadata', () => {
      const obs$: Observable<any> = of({});

      const obj: any = {
        myProperty: ''
      };

      expect(setSoftCache(obs$, obj, 'myProperty')).toEqual(obs$);
    });
  });
});
