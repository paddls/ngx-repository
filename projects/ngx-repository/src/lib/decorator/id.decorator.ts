import {Column} from './column.decorator';

/**
 * @ignore
 */
export const ID_METADATA_KEY: string = 'id';

export interface IdContext {

  field?: string;

  readOnly?: boolean;

  writeOnly?: boolean;
}

export function Id(idContext?: IdContext|string): any {
  return (target: any, propertyKey: string) => {
    Column(idContext)(target, propertyKey);
    Reflect.defineMetadata(ID_METADATA_KEY, propertyKey, target);
  };
}
