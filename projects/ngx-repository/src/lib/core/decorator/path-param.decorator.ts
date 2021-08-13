import {PathParamContext, PathParamContextConfiguration} from '../configuration/context/path-param-context.configuration';

/**
 * @ignore
 */
export const PATH_PARAM_METADATA_KEY: string = 'pathParams';

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
