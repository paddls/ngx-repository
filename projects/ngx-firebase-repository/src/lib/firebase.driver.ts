import {Driver} from '@witty-services/ngx-repository';
import {asyncScheduler, from, Observable, SchedulerLike, Subscriber, throwError} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseRequest, FirebaseRequestOrderBy, FirebaseRequestQuery} from './firebase.request';
import {isNullOrUndefined} from 'util';
import {FIRESTORE_APP} from './ngx-firebase-repository.module.di';
import {catchError, mapTo} from 'rxjs/operators';
import {NgxFirebaseRepositoryReadRequestError} from './error/ngx-firebase-repository-read-request.error';
import {NgxFirebaseRepositoryDeleteRequestError} from './error/ngx-firebase-repository-delete-request.error';
import {NgxFirebaseRepositoryUpdateRequestError} from './error/ngx-firebase-repository-update-request.error';
import {NgxFirebaseRepositoryCreateRequestError} from './error/ngx-firebase-repository-create-request.error';
import Firestore = firebase.firestore.Firestore;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import Query = firebase.firestore.Query;

/**
 * @ignore
 */
@Injectable()
export class FirebaseDriver implements Driver<{ id: any }|QuerySnapshot<DocumentData>|DocumentSnapshot> {

  private readonly firestore: Firestore;

  public constructor(@Inject(FIRESTORE_APP) firestore: any) {
    this.firestore = firestore;
  }

  public create<K>(object: any, request: FirebaseRequest<K>): Observable<{ id: any }> {
    if (request.id !== null && request.id !== undefined) {
      return from(this.firestore.doc(request.createPath).set(object)).pipe(
        mapTo(object),
        catchError((err: any) => {
          if (err.name === 'FirebaseError') {
            return throwError(new NgxFirebaseRepositoryCreateRequestError(request, err));
          } else {
            return throwError(err);
          }
        })
      );
    } else {
      return from(this.firestore.collection(request.createPath).add(object)).pipe(
        catchError((err: any) => {
          if (err.name === 'FirebaseError') {
            return throwError(new NgxFirebaseRepositoryCreateRequestError(request, err));
          } else {
            return throwError(err);
          }
        })
      );
    }
  }

  public update<K>(object: any, request: FirebaseRequest<K>): Observable<any> {
    return from(this.firestore.doc(request.updatePath).update(object)).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryUpdateRequestError(request, err));
        } else {
          return throwError(err);
        }
      })
    );
  }

  public delete<K>(request: FirebaseRequest<K>): Observable<any> {
    return from(this.firestore.doc(request.deletePath).delete()).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryDeleteRequestError(request, err));
        } else {
          return throwError(err);
        }
      })
    );
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

    return fromRef<QuerySnapshot<DocumentData>>(collection).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryReadRequestError(request, err));
        } else {
          return throwError(err);
        }
      })
    );
  }

  public findOne<K>(request: FirebaseRequest<K>): Observable<DocumentSnapshot> {
    return fromRef<DocumentSnapshot>(this.firestore.doc(request.readPath)).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryReadRequestError(request, err));
        } else {
          return throwError(err);
        }
      })
    );
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
