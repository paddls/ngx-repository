import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface PathColumnContext {
  name: string;
}

/**
 * @ignore
 */
export interface PathColumnContextConfiguration extends PathColumnContext, PropertyKeyConfiguration {
}
