import {Converter, JSON_PROPERTY_METADATA_KEY, JsonProperty, JsonPropertyContext, JsonPropertyContextConfiguration} from '@witty-services/ts-serializer';

/**
 * @ignore
 */
export const COLUMNS_METADATA_KEY: string = JSON_PROPERTY_METADATA_KEY;

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
}

/**
 * @ignore
 */
export interface ColumnContextConfiguration<T, R> extends JsonPropertyContextConfiguration<T, R> {

  propertyKey: string;
}

/**
 * Column decorator allow you to configure the serialization/deserialization process.
 *
 * ```typescript
 * @Column() // define a column
 * public firstName: string;
 *
 * @Column('lastname')  // define a column with special mapping
 * public lastName: string;
 *
 * @Column(() => Address) // define a column with a child model
 * public address: Address;
 *
 * @Column({ type: () => Job, field: 'job' }) // combine model and special mapping
 * public myJob: Job;
 *
 * @Column({field: 'createdAt', customConverter: () => DateConverter}) // use custom converter for special type
 * public createdAt: Date;
 * ```
 *
 * @typeParam T Type of attribute
 *
 * @param columnContext Decorator configuration
 */
export function Column<T, R>(columnContext: ColumnContext<T, R>|string|(() => new(...args: any[]) => T)): any {
  return (target: any, propertyKey: string) => {
    JsonProperty(columnContext)(target, propertyKey);
  };
}
