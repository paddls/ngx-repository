import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import {Page} from '@witty-services/ngx-repository';
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import {FirebasePageBuilder} from './firebase-page-builder';

/**
 * @ignore
 */
@Injectable()
export class FirebaseNoPageBuilder implements FirebasePageBuilder {

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
