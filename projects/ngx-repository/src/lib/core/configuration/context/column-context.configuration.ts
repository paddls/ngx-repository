import {ConstructorFunction, Converter, JsonPropertyContext, JsonPropertyContextConfiguration} from '@witty-services/ts-serializer';
import {SerializeType} from '@witty-services/ts-serializer/dist/common';

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
  type?: () => SerializeType<T>|SerializeType<T>[];

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
  customConverter?: () => ConstructorFunction<Converter<T, R>>;

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
   * Groups configure to normalize the column
   */
  groups?: string | string[];
}

/**
 * @ignore
 */
export interface ColumnContextConfiguration<T, R> extends JsonPropertyContextConfiguration<T, R> {

  propertyKey: string;
}
