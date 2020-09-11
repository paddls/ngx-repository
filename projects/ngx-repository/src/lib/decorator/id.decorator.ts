import {Column} from './column.decorator';

/**
 * @ignore
 */
export const ID_METADATA_KEY: string = 'id';

export interface IdContext {

  /**
   * Field name in json.
   */
  field?: string;

  /**
   * Boolean to indicate to not send the value in json to the server.
   */
  readOnly?: boolean;

  /**
   * Boolean to indicate to ignore the field in json.
   */
  writeOnly?: boolean;

  /**
   * Boolean to override global configuration to denormalize the column when is set to null value
   */
  denormalizeNull?: boolean;

  /**
   * Boolean to override global configuration to denormalize the column when is set to undefined value
   */
  denormalizeUndefined?: boolean;

  /**
   * Boolean to override global configuration to normalize the column when is set to null value
   */
  normalizeNull?: boolean;

  /**
   * Boolean to override global configuration to normalize the column when is set to undefined value
   */
  normalizeUndefined?: boolean;
}

export function Id(idContext?: IdContext|string): any {
  return (target: any, propertyKey: string) => {
    Column(idContext)(target, propertyKey);
    Reflect.defineMetadata(ID_METADATA_KEY, propertyKey, target);
  };
}
