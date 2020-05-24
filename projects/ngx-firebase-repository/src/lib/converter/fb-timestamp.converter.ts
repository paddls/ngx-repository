import * as firebase from 'firebase/app';
import {Converter} from '@witty-services/ngx-repository';

export class FbTimestampConverter implements Converter<Date, firebase.firestore.Timestamp> {

  public fromJson(value: firebase.firestore.Timestamp): Date {
    return !value ? value as any : value.toDate();
  }

  public toJson(value: Date): firebase.firestore.Timestamp {
    return !value ? value as any : firebase.firestore.Timestamp.fromDate(value);
  }
}
