import {ResponseBuilder} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class FirebaseFindOneResponseBuilder implements ResponseBuilder<DocumentSnapshot> {

  public build(response$: Observable<DocumentSnapshot>): Observable<any> {
    return response$.pipe(
      map((documentSnapshot: DocumentSnapshot) => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      }))
    );
  }
}
