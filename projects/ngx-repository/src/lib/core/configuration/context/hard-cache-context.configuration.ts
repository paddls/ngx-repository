import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface HardCacheContext {

  expires?: number;
}

/**
 * @ignore
 */
export interface HardCacheContextConfiguration extends HardCacheContext, PropertyKeyConfiguration {
}
