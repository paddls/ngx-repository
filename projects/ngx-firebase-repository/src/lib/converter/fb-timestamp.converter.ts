import firebase from 'firebase';
import { Converter } from '@witty-services/ngx-repository';
import Timestamp = firebase.firestore.Timestamp;

/**
 * @ignore
 */
export class FbTimestampConverter implements Converter<Date, Timestamp> {

  public fromJson(value: Timestamp): Date {
    return !value ? value as any : value.toDate();
  }

  public toJson(value: Date): Timestamp {
    return !value ? value as any : Timestamp.fromDate(value);
  }
}
