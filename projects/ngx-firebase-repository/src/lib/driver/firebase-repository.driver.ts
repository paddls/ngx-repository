import { Inject, Injectable } from '@angular/core';
import { FirebaseRepositoryRequest } from '../request/firebase-repository.request';
import { from, Observable, throwError } from 'rxjs';
import { PublisherService, RepositoryDriver, RepositoryResponse } from '@witty-services/ngx-repository';
import { FIRESTORE_APP } from '../ngx-firebase-repository.module.di';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { NgxFirebaseRepositoryReadRequestError } from '../error/ngx-firebase-repository-read-request.error';
import { FirebaseCollectionRepositoryResponse } from '../response/firebase-collection-repository.response';
import { fromRef } from './from-ref.function';
import { FirebaseDocumentRepositoryResponse } from '../response/firebase-document-repository.response';
import { NgxFirebaseRepositoryCreateRequestError } from '../error/ngx-firebase-repository-create-request.error';
import { FirebaseDocumentReferenceRepositoryResponse } from '../response/firebase-document-reference-repository.response';
import { NgxFirebaseRepositoryUpdateRequestError } from '../error/ngx-firebase-repository-update-request.error';
import { NgxFirebaseRepositoryDeleteRequestError } from '../error/ngx-firebase-repository-delete-request.error';
import { FirebaseEmptyRepositoryResponse } from '../response/firebase-empty-repository.response';
import { FirebaseCriteriaRepositoryRequest } from '../request/firebase-criteria-repository.request';
import { BeforeExecuteFirebaseRequestEvent } from './event/before-execute-firebase-request.event';
import { FirebaseRepositoryResponse } from '../response/firebase-repository.response';
import { AfterExecuteFirebaseRequestEvent } from './event/after-execute-firebase-request.event';
import { cloneDeep } from 'lodash';
import { DocumentReference, DocumentSnapshot, Firestore, Query, QuerySnapshot } from 'firebase/firestore';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from '../firestore';

// @dynamic
@Injectable()
export class FirebaseRepositoryDriver implements RepositoryDriver {

  public constructor(@Inject(FIRESTORE_APP) private readonly firestore: Firestore) {
  }

  public execute(request: FirebaseRepositoryRequest): Observable<FirebaseRepositoryResponse> {
    PublisherService.getInstance().publish(new BeforeExecuteFirebaseRequestEvent(cloneDeep({request})));

    let obs$: Observable<RepositoryResponse>;

    switch (request.operation) {
      case 'findAll':
      case 'findOne':
        obs$ = this.findBy(request);

        break;

      case 'findById':
        obs$ = this.findById(request);

        break;

      case 'create':
        obs$ = this.create(request);

        break;

      case 'update':
      case 'patch':
        obs$ = this.update(request);

        break;

      case 'delete':
        obs$ = this.delete(request);

        break;

      default:
        throw new Error(`Operation not supported (${request.operation})`);
    }

    return obs$.pipe(
      tap((response: FirebaseRepositoryResponse) => PublisherService.getInstance().publish(new AfterExecuteFirebaseRequestEvent(cloneDeep({
        request,
        response
      }))))
    );
  }

  public findById(request: FirebaseRepositoryRequest): Observable<RepositoryResponse> {
    return fromRef(doc(this.firestore, request.path.value)).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryReadRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      map((response: DocumentSnapshot) => new FirebaseDocumentRepositoryResponse(response, request))
    );
  }

  public create(request: FirebaseRepositoryRequest): Observable<RepositoryResponse> {
    if (request?.path?.id?.value != null) {
      const documentRef: DocumentReference = doc(this.firestore, request.path.value);

      return from(setDoc(documentRef, request.body)).pipe(
        mapTo(documentRef),
        catchError((err: any) => {
          if (err.name === 'FirebaseError') {
            return throwError(new NgxFirebaseRepositoryCreateRequestError(null, err));
          } else {
            return throwError(err);
          }
        }),
        map((response: DocumentReference) => new FirebaseDocumentReferenceRepositoryResponse(response, request))
      );
    } else {
      return from(addDoc(collection(this.firestore, request.path.value), request.body)).pipe(
        catchError((err: any) => {
          if (err.name === 'FirebaseError') {
            return throwError(new NgxFirebaseRepositoryCreateRequestError(null, err));
          } else {
            return throwError(err);
          }
        }),
        map((response: DocumentReference) => new FirebaseDocumentReferenceRepositoryResponse(response, request))
      );
    }
  }

  public update(request: FirebaseRepositoryRequest): Observable<RepositoryResponse> {
    return from(updateDoc(doc(this.firestore, request.path.value), request.body)).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryUpdateRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      mapTo(new FirebaseEmptyRepositoryResponse(request))
    );
  }

  public delete(request: FirebaseRepositoryRequest): Observable<RepositoryResponse> {
    return from(deleteDoc(doc(this.firestore, request.path.value))).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryDeleteRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      mapTo(new FirebaseEmptyRepositoryResponse(request))
    );
  }

  protected findBy(request: FirebaseRepositoryRequest): Observable<RepositoryResponse> {
    if (!(request instanceof FirebaseCriteriaRepositoryRequest)) {
      throw new Error('Request must be typeof FirebaseCriteriaRepositoryRequest');
    }

    const query: Query = (request as FirebaseCriteriaRepositoryRequest).getQuery(this.firestore);

    return fromRef<QuerySnapshot>(query).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryReadRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      map((response: QuerySnapshot) => new FirebaseCollectionRepositoryResponse(response, request))
    );
  }
}

