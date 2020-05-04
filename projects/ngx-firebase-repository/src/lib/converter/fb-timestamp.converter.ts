import {Converter} from '@witty-services/ngx-repository';
import * as firebase from 'firebase/app';

export class FbTimestampConverter implements Converter<Date, firebase.firestore.Timestamp> {

  public fromJson(value: firebase.firestore.Timestamp): Date {
    return value.toDate();
  }

  public toJson(value: Date): firebase.firestore.Timestamp {
    return firebase.firestore.Timestamp.fromDate(value);
  }
}
