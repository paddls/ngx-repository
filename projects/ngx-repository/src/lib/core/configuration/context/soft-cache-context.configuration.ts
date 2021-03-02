import {CacheScope} from '../../common/decorator/cache-scope.enum';
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface SoftCacheContext {

  scope?: CacheScope;

  expires?: number;
}

/**
 * @ignore
 */
export interface SoftCacheContextConfiguration extends SoftCacheContext, PropertyKeyConfiguration {
}
