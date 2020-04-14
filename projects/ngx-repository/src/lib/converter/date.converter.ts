import {Converter} from './converter';

export class DateConverter implements Converter<Date, any> {

  public fromJson(value: any): Date {
    if (!value) {
      return value;
    }

    return new Date(value);
  }

  public toJson(value: Date): any {
    if (!value) {
      return value;
    }

    return value.toISOString();
  }
}
