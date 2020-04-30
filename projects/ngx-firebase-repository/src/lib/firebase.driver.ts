import {Driver} from '@witty-services/ngx-repository';
import {asyncScheduler, from, Observable, SchedulerLike, Subscriber} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseRequest, FirebaseRequestOrderBy, FirebaseRequestQuery} from './firebase.request';
import {isNullOrUndefined} from 'util';
import Firestore = firebase.firestore.Firestore;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import Query = firebase.firestore.Query;
import DocumentReference = firebase.firestore.DocumentReference;
import {FIREBASE_APP} from './ngx-firebase-repository.module.di';

@Injectable()
export class FirebaseDriver implements Driver<any> {

  private firestore: Firestore;

  public constructor(@Inject(FIREBASE_APP) firebaseApp: any) {
    this.firestore = firebaseApp.firestore();
  }

  public create<K>(object: any, request: FirebaseRequest<K>): Observable<DocumentReference<DocumentData>> {
    return from(this.firestore.collection(request.createPath).add(object));
  }

  public update<K>(object: any, request: FirebaseRequest<K>): Observable<void> {
    return from(this.firestore.doc(request.updatePath).set(object));
  }

  public delete<K>(request: FirebaseRequest<K>): Observable<any> {
    return from(this.firestore.doc(request.deletePath).delete());
  }

  public findBy<K>(request: FirebaseRequest<K>): Observable<QuerySnapshot<DocumentData>> {
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

  public findOne<K>(query: FirebaseRequest<K>): Observable<DocumentSnapshot> {
    return fromRef<DocumentSnapshot>(this.firestore.doc(query.readPath));
  }
}

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
