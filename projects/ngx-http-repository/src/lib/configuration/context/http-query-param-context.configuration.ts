import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

export interface HttpQueryParamContext {
  name?: string;
  format?: string;
}

/**
 * @ignore
 */
export interface HttpQueryParamContextConfiguration extends HttpQueryParamContext, PropertyKeyConfiguration {
}
