export interface Converter<T, R> {

  fromJson(value: R): T;

  toJson(value: T): R;
}
