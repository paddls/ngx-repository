import {
  HttpParamContext,
  HttpParamContextConfiguration
} from '../configuration/context/http-param-context.configuration';

export function setParamsMetadata(metadataKey: string, params?: HttpParamContext | string): any {
  return (target: any, propertyKey: string) => {
    let httpParamContextConfiguration: HttpParamContextConfiguration = {
      propertyKey,
      name: propertyKey,
      format: ':value'
    };

    if (typeof params === 'object') {
      httpParamContextConfiguration = {
        ...httpParamContextConfiguration,
        ...params
      };
    } else if (typeof params === 'string') {
      httpParamContextConfiguration.name = params;
    }

    let metas: HttpParamContextConfiguration[] = [];
    if (Reflect.hasMetadata(metadataKey, target)) {
      metas = Reflect.getMetadata(metadataKey, target);
    }
    Reflect.defineMetadata(metadataKey, metas.concat(httpParamContextConfiguration), target);
  };
}
