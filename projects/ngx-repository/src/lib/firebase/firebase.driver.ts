import {Driver} from '../driver/driver';
import {asyncScheduler, from, Observable, SchedulerLike, Subscriber} from 'rxjs';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {map, mapTo} from 'rxjs/operators';
import {FirebaseRequest, FirebaseRequestOrderBy, FirebaseRequestQuery} from './firebase.request';
import {isNullOrUndefined} from 'util';
import App = firebase.app.App;
import Firestore = firebase.firestore.Firestore;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import Query = firebase.firestore.Query;

@Injectable()
export class FirebaseDriver implements Driver<Observable<any>> {

  private firebase: App;
  private firestore: Firestore;

  public constructor() {
    // TODO @RMA inject configuration
    const firebaseConfiguration: any = {
      apiKey: 'AIzaSyDSd6EXdQWaWcBMxbTYp-kFAV3zxNu-ArM',
      authDomain: 'ngx-repository.firebaseapp.com',
      databaseURL: 'https://ngx-repository.firebaseio.com',
      projectId: 'ngx-repository',
      storageBucket: 'ngx-repository.appspot.com',
      messagingSenderId: '352664344689',
      appId: '1:352664344689:web:20ec56387616cba621e3d0',
      measurementId: 'G-0RD9MTX3PB'
    };
    this.firebase = firebase.initializeApp(firebaseConfiguration);
    this.firestore = this.firebase.firestore();
  }

  public create<K>(object: any, request: FirebaseRequest<K>): Observable<any> {
    return from(this.firestore.collection(request.createPath).add(object)).pipe(
      mapTo(void 0) // TODO @RMA serialization
    );
  }

  public update<K>(object: any, request: FirebaseRequest<K>): Observable<any> {
    return from(this.firestore.doc(request.updatePath).set(object)).pipe(
      mapTo(void 0) // TODO @RMA serialization
    );
  }

  public delete<K>(request: FirebaseRequest<K>): Observable<any> {
    return from(this.firestore.doc(request.deletePath).delete()).pipe(
      mapTo(void 0) // TODO @RMA serialization
    );
  }

  public findBy<K>(request: FirebaseRequest<K>): Observable<any> {
    let collection: Query = this.firestore.collection(request.readPath);

    (request.queries || []).forEach((firebaseRequestQuery: FirebaseRequestQuery) => {
      collection = collection.where(
        firebaseRequestQuery.field,
        firebaseRequestQuery.operator,
        firebaseRequestQuery.value
      );
    });

    (request.orderBys || []).forEach((firebaseRequestOrderBy: FirebaseRequestOrderBy) => {
      collection = collection.orderBy(firebaseRequestOrderBy.fieldPath, firebaseRequestOrderBy.directionStr);
    });

    if (!isNullOrUndefined(request.startAt)) {
      collection = collection.startAt(...request.startAt);
    }

    if (!isNullOrUndefined(request.startAfter)) {
      collection = collection.startAfter(...request.startAfter);
    }

    if (!isNullOrUndefined(request.endAt)) {
      collection = collection.endAt(...request.endAt);
    }

    if (!isNullOrUndefined(request.endBefore)) {
      collection = collection.endBefore(...request.endBefore);
    }

    if (!isNullOrUndefined(request.limit)) {
      collection = collection.limit(request.limit);
    }

    if (!isNullOrUndefined(request.limitToLast)) {
      collection = collection.limitToLast(request.limitToLast);
    }

    return fromRef<QuerySnapshot<DocumentData>>(collection);
  }

  public findOne<K>(query: FirebaseRequest<K>): Observable<any> {
    return fromRef<DocumentSnapshot>(this.firestore.doc(query.readPath)).pipe(
      map((data: DocumentSnapshot) => ({
        id: data.id,
        ...data.data()
      }))
    );
  }
}

// @TODO @TNI => there is a function already exists in firestore rxfire package ?
export function fromRef<T>(ref: any, scheduler: SchedulerLike = asyncScheduler): Observable<T> {
  return new Observable((subscriber: Subscriber<T>) => {
    let unsubscribe: any;
    if (scheduler != null) {
      scheduler.schedule(() => {
        unsubscribe = ref.onSnapshot(subscriber);
      });
    } else {
      unsubscribe = ref.onSnapshot(subscriber);
    }

    return () => {
      if (unsubscribe != null) {
        unsubscribe();
      }
    };
  });
}
