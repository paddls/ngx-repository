import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';

/**
 * @ignore
 */
export const PATH_COLUMN_METADATA_KEY: string = 'pathColumns';

export interface PathColumnContext {
  name: string;
}

/**
 * @ignore
 */
export interface PathColumnContextConfiguration extends PathColumnContext, PropertyKeyConfiguration {
}

export function PathColumn(params?: PathColumnContext|string): any {
  return (target: any, propertyKey: string) => {
    let pathColumnContextConfiguration: PathColumnContextConfiguration = {
      propertyKey,
      name: propertyKey
    };

    if (typeof params === 'object') {
      pathColumnContextConfiguration = {
        ...pathColumnContextConfiguration,
        ...params
      };
    } else if (typeof params === 'string') {
      pathColumnContextConfiguration.name = params;
    }

    let metas: PathColumnContextConfiguration[] = [];
    if (Reflect.hasMetadata(PATH_COLUMN_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, target);
    }
    Reflect.defineMetadata(PATH_COLUMN_METADATA_KEY, metas.concat(pathColumnContextConfiguration), target);
  };
}
