import { Type } from '@angular/core';
import { ResponseProcessor } from '@witty-services/ngx-repository';
import { HttpRepositoryParamContextConfiguration } from './http-repository-param-context.configuration';

export interface HttpRepositoryFindAllParamContextConfiguration extends HttpRepositoryParamContextConfiguration {
  pageResponseProcessor?: Type<ResponseProcessor>;
}
