import { Converter } from '@witty-services/ts-serializer';
import { Type } from '@angular/core';
import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';

export interface HttpParamContext {
  name?: string;
  /**
   * @deprecated use customConverter instead
   */
  format?: string;
  customConverter?: () => Type<Converter<any, string>>;
}

export interface HttpParamContextConfiguration extends HttpParamContext, PropertyKeyConfiguration {
}
