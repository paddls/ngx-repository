import { Driver } from '../driver';
import { asyncScheduler, Observable, of, SchedulerLike, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import App = firebase.app.App;
import Firestore = firebase.firestore.Firestore;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import { map, tap } from 'rxjs/operators';
import DocumentData = firebase.firestore.DocumentData;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

@Injectable()
export class FirebaseDriver implements Driver<any, Observable<any>> {

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

  public create(object: any, query: any): Observable<any> {
    return of(null);
  }

  public update(object: any, query: any): Observable<any> {
    return of(null);
  }

  public delete(query: any): Observable<any> {
    return of(null);
  }

  public findBy(query: any): Observable<any> {
    console.log(query);

    return fromCollection(
      this.firestore.collection('/clients')
      // .where('state', '==', 'CA')
    ).pipe(
      tap(console.log),
      map((data: QuerySnapshot<DocumentData>) => data.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      })))
    );
  }

  public findOne(query: any): Observable<any> {
    return of(null);
  }
}

function fromCollection(ref: any, scheduler: SchedulerLike = asyncScheduler): Observable<QuerySnapshot<DocumentData>> {
  return new Observable((subscriber: Subscriber<QuerySnapshot<DocumentData>>) => {
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
