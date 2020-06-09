import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FirebaseResponseBuilder} from './firebase-response-builder';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

/**
 * @ignore
 */
export class FirebaseFindOneResponseBuilder implements FirebaseResponseBuilder {

  public build(response$: Observable<DocumentSnapshot>): Observable<any> {
    return response$.pipe(
      map((documentSnapshot: DocumentSnapshot) => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      }))
    );
  }
}
