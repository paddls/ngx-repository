import {Converter, JSON_PROPERTY_METADATA_KEY, JsonProperty, JsonPropertyContext, JsonPropertyContextConfiguration} from '@witty-services/ts-serializer';

export const COLUMNS_METADATA_KEY: string = JSON_PROPERTY_METADATA_KEY;

export interface ColumnContext<T, R> extends JsonPropertyContext<T, R> {

  field?: string;

  type?: () => new(...args: any[]) => T;

  readOnly?: boolean;

  writeOnly?: boolean;

  customConverter?: () => new(...args: any[]) => Converter<T, R>;
}

export interface ColumnContextConfiguration<T, R> extends JsonPropertyContextConfiguration<T, R> {

  propertyKey: string;
}

export function Column<T, R>(columnContext?: ColumnContext<T, R>|string|(() => new(...args: any[]) => T)): any {
  return (target: any, propertyKey: string) => {
    JsonProperty(columnContext)(target, propertyKey);
  };
}
