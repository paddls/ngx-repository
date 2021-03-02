import {Converter, JsonPropertyContext, JsonPropertyContextConfiguration} from '@witty-services/ts-serializer';

/**
 * Describe advanced configuration for Column decorator.
 */
export interface ColumnContext<T, R> extends JsonPropertyContext<T, R> {

  /**
   * Field name in json.
   */
  field?: string;

  /**
   * Field type after deserialization.
   */
  type?: () => new(...args: any[]) => T;

  /**
   * Boolean to indicate to not send the value in json to the server.
   */
  readOnly?: boolean;

  /**
   * Boolean to indicate to ignore the field in json.
   */
  writeOnly?: boolean;

  /**
   * A converter to make a custom serialization/deserialization
   */
  customConverter?: () => new(...args: any[]) => Converter<T, R>;

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

/**
 * @ignore
 */
export interface ColumnContextConfiguration<T, R> extends JsonPropertyContextConfiguration<T, R> {

  propertyKey: string;
}
