import { PropertyKeyConfiguration } from '../../common/decorator/property-key-configuration';
import { Type } from '@angular/core';
import { Converter } from '@witty-services/ts-serializer';

export interface PathParamContext {
  name?: string;
  customConverter?: () => Type<Converter<any, string>>;
}

/**
 * @ignore
 */
export interface PathParamContextConfiguration extends PathParamContext, PropertyKeyConfiguration {
}
