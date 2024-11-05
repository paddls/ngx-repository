import { Converter } from '@paddls/ngx-repository';
import { Timestamp } from 'firebase/firestore';

/**
 * @ignore
 */
export class FsTimestampConverter implements Converter<Date, Timestamp> {

  public fromJson(value: Timestamp): Date {
    return !value ? value as any : value.toDate();
  }

  public toJson(value: Date): Timestamp {
    return !value ? value as any : Timestamp.fromDate(value);
  }
}
