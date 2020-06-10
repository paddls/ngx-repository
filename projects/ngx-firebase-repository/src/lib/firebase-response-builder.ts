import {ResponseBuilder} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;

export interface FirebaseResponseBuilder extends ResponseBuilder<DocumentData|{ id: any }> {
}
