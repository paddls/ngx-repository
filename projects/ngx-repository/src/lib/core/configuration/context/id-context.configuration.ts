import { Converter } from '@witty-services/ts-serializer';

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

  /**
   * A converter to make a custom serialization/deserialization
   */
  customConverter?: () => new(...args: any[]) => Converter<any, any>;
}
