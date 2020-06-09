import {PageBuilder} from '@witty-services/ngx-repository';
import {FirebaseRepository} from './firebase.repository';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

export interface FirebasePageBuilder extends PageBuilder<QuerySnapshot<DocumentData>, FirebaseRepository<any, any>> {
}
