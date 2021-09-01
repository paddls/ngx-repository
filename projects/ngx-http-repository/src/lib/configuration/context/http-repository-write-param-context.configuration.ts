import { HttpRepositoryParamContextConfiguration } from './http-repository-param-context.configuration';

export interface HttpRepositoryWriteParamContextConfiguration extends HttpRepositoryParamContextConfiguration {
  /**
   * return the entire response instead of id or void
   * default: false
   */
  fullResponse?: boolean;
}
