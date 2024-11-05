import { HARD_CACHE_METADATA_KEY, HardCache, setHardCache } from './hard-cache.decorator';
import { Observable, of } from 'rxjs';

describe('HardCacheDecorator', () => {

  describe('#HardCache', () => {
    it('should put context configuration with null param on target', () => {
      const obj: any = {
        myProperty: ''
      };
      HardCache()(obj, 'myProperty');

      expect(Reflect.getMetadata(HARD_CACHE_METADATA_KEY, obj, 'myProperty')).toEqual({
        propertyKey: 'myProperty',
        expires: null
      });
    });

    it('should put context with just expires param on target', () => {
      const obj: any = {
        myProperty: ''
      };
      HardCache(3)(obj, 'myProperty');

      expect(Reflect.getMetadata(HARD_CACHE_METADATA_KEY, obj, 'myProperty')).toEqual({
        propertyKey: 'myProperty',
        expires: 3
      });
    });

    it('should put context with just expires param in object context on target', () => {
      const obj: any = {
        myProperty: ''
      };
      HardCache({
        expires: 4
      })(obj, 'myProperty');

      expect(Reflect.getMetadata(HARD_CACHE_METADATA_KEY, obj, 'myProperty')).toEqual({
        propertyKey: 'myProperty',
        expires: 4
      });
    });
  });

  describe('#setHardCache', () => {

    it('should just return the original observable if there is no hard cache metadata', () => {
      const obs$: Observable<any> = of({});

      const obj: any = {
        myProperty: ''
      };

      expect(setHardCache(obs$, obj, 'myProperty')).toEqual(obs$);
    });
  });
});
