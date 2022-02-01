import {JSON_PROPERTY_METADATA_KEY, JsonProperty} from '@witty-services/ts-serializer';
import {ColumnContext} from '../configuration/context/column-context.configuration';
import {SerializeType} from '@witty-services/ts-serializer/dist/common';

/**
 * @ignore
 */
export const COLUMNS_METADATA_KEY: string = JSON_PROPERTY_METADATA_KEY;

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
export function Column<T = any, R = any>(columnContext?: ColumnContext<T, R>|string|(() => SerializeType<T>|SerializeType<any>[])): any {
  return (target: any, propertyKey: string) => {
    JsonProperty(columnContext)(target, propertyKey);
  };
}
