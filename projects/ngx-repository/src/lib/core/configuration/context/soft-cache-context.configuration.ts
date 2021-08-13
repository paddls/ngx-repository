import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface SoftCacheContext {

  expires?: number;
}

/**
 * @ignore
 */
export interface SoftCacheContextConfiguration extends SoftCacheContext, PropertyKeyConfiguration {
}
