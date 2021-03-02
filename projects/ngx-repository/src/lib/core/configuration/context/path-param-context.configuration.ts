import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface PathParamContext {
  name: string;
}

/**
 * @ignore
 */
export interface PathParamContextConfiguration extends PathParamContext, PropertyKeyConfiguration {
}
