import { PropertyKeyConfiguration } from '@paddls/ngx-repository';
import { HttpParamContext } from './http-param-context.configuration';

export interface HttpHeaderContext extends HttpParamContext {
}

/**
 * @ignore
 */
export interface HttpHeaderContextConfiguration extends HttpHeaderContext, PropertyKeyConfiguration {
}
