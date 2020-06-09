import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {FirebaseResponseBuilder} from './firebase-response-builder';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import DocumentReference = firebase.firestore.DocumentReference;

/**
 * @ignore
 */
@Injectable()
export class FirebaseCreateResponseBuilder implements FirebaseResponseBuilder {

  public build(response$: Observable<DocumentReference<DocumentData>>): Observable<any> {
    return response$.pipe(
      map((documentReference: DocumentReference<DocumentData>) => documentReference.id)
    );
  }
}
