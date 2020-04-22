import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PageBuilder} from '../page-builder/page-builder';
import {Page} from '../page-builder/page';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

@Injectable()
export class FirebasePageBuilder implements PageBuilder<Observable<any>> {

  public buildPage(response$: Observable<QuerySnapshot<DocumentData>>): Observable<Page<any>> {
    return response$.pipe(
      map((qs: QuerySnapshot<DocumentData>) => new Page<any>(qs.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data()
        })))
      )
    );
  }
}
