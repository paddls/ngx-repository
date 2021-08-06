import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import { HttpParamContext } from './http-param-context.configuration';

export interface HttpQueryParamContext extends HttpParamContext {
}

/**
 * @ignore
 */
export interface HttpQueryParamContextConfiguration extends HttpQueryParamContext, PropertyKeyConfiguration {
}
