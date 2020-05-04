import {ResponseBuilder} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import DocumentData = firebase.firestore.DocumentData;
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class FirebaseCreateResponseBuilder implements ResponseBuilder<DocumentReference<DocumentData>> {

  public build(response$: Observable<{id: any}>): Observable<any> {
    return response$.pipe(
      map((documentReference: {id: any}) => documentReference.id)
    );
  }
}
