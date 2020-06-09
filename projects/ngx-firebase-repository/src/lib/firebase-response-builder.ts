import {ResponseBuilder} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export interface FirebaseResponseBuilder extends ResponseBuilder<DocumentReference<DocumentData>|DocumentSnapshot> {
}
