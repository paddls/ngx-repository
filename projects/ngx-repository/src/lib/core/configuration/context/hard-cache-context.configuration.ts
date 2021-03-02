import {CacheScope} from '../../common/decorator/cache-scope.enum';
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface HardCacheContext {

  scope?: CacheScope;

  expires?: number;
}

/**
 * @ignore
 */
export interface HardCacheContextConfiguration extends HardCacheContext, PropertyKeyConfiguration {
}
