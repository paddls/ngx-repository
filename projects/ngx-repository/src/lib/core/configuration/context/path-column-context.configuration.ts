import { PropertyKeyConfiguration } from '../../common/decorator/property-key-configuration';
import { PathParamContext } from './path-param-context.configuration';

export interface PathColumnContext extends PathParamContext {
}

/**
 * @ignore
 */
export interface PathColumnContextConfiguration extends PathColumnContext, PropertyKeyConfiguration {
}
