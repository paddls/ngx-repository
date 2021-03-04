import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

export interface HttpHeaderContext {
  name: string;
}

/**
 * @ignore
 */
export interface HttpHeaderContextConfiguration extends HttpHeaderContext, PropertyKeyConfiguration {
}
