import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';

export const PATH_PARAM_METADATA_KEY: string = 'pathParams';

export interface PathParamContext {
  name: string;
}

export interface PathParamContextConfiguration extends PathParamContext, PropertyKeyConfiguration {
}

export function PathParam(params?: PathParamContext|string): any {
  return (target: any, propertyKey: string) => {
    let paramContextConfiguration: PathParamContextConfiguration = {
      propertyKey,
      name: propertyKey
    };

    if (typeof params === 'object') {
      paramContextConfiguration = {
        ...paramContextConfiguration,
        ...params
      };
    } else if (typeof params === 'string') {
      paramContextConfiguration.name = params;
    }

    let metas: PathParamContextConfiguration[] = [];
    if (Reflect.hasMetadata(PATH_PARAM_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(PATH_PARAM_METADATA_KEY, target);
    }
    Reflect.defineMetadata(PATH_PARAM_METADATA_KEY, metas.concat(paramContextConfiguration), target);
  };
}
