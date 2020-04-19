import { Driver } from '../driver';
import { asyncScheduler, EMPTY, from, Observable, SchedulerLike, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { map, mapTo, tap } from 'rxjs/operators';
import { FirebaseQuery } from './firebase.query';
import App = firebase.app.App;
import Firestore = firebase.firestore.Firestore;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable()
export class FirebaseDriver implements Driver<FirebaseQuery, Observable<any>> {

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

  public create(object: any, query: FirebaseQuery): Observable<any> {
    return from(this.firestore.collection(query.getPath()).add(object)).pipe(
      mapTo(void 0) // TODO @RMA serialization
    );
  }

  public update(object: any, query: FirebaseQuery): Observable<any> {
    return from(this.firestore.doc(query.getPath()).set(object)).pipe(
      mapTo(void 0) // TODO @RMA serialization
    );
  }

  public delete(query: FirebaseQuery): Observable<any> {
    return from(this.firestore.doc(query.getPath()).delete()).pipe(
      mapTo(void 0) // TODO @RMA serialization
    );
  }

  public findBy(query: FirebaseQuery): Observable<any> {
    // TODO @RMA pagination
    return fromRef<QuerySnapshot<DocumentData>>(
      this.firestore.collection(query.getPath())
      // .where('state', '==', 'CA') // TODO @RMA criteria
    ).pipe(
      map((data: QuerySnapshot<DocumentData>) => data.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      })))
    );
  }

  public findOne(query: FirebaseQuery): Observable<any> {
    return fromRef<DocumentSnapshot>(this.firestore.doc(query.getPath())).pipe(
      tap(console.log),
      map((data: DocumentSnapshot) => ({
        id: data.id,
        ...data.data()
      }))
    );
  }
}

function fromRef<T>(ref: any, scheduler: SchedulerLike = asyncScheduler): Observable<T> {
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
