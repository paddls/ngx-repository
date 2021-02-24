import { Inject, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseRepositoryRequest } from '../request/firebase-repository.request';
import { from, Observable, throwError } from 'rxjs';
import { RepositoryDriver, RepositoryResponse } from '@witty-services/ngx-repository';
import { FIRESTORE_APP } from '../ngx-firebase-repository.module.di';
import { catchError, map, mapTo } from 'rxjs/operators';
import { NgxFirebaseRepositoryReadRequestError } from '../error/ngx-firebase-repository-read-request.error';
import { FirebaseCollectionRepositoryResponse } from '../response/firebase-collection-repository.response';
import { fromRef } from './from-ref.function';
import { FirebaseDocumentRepositoryResponse } from '../response/firebase-document-repository.response';
import { NgxFirebaseRepositoryCreateRequestError } from '../error/ngx-firebase-repository-create-request.error';
import { FirebaseDocumentReferenceRepositoryResponse } from '../response/firebase-document-reference-repository.response';
import { NgxFirebaseRepositoryUpdateRequestError } from '../error/ngx-firebase-repository-update-request.error';
import { NgxFirebaseRepositoryDeleteRequestError } from '../error/ngx-firebase-repository-delete-request.error';
import { FirebaseEmptyRepositoryResponse } from '../response/firebase-empty-repository.response';
import Firestore = firebase.firestore.Firestore;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;
import Query = firebase.firestore.Query;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class FirebaseRepositoryDriver implements RepositoryDriver {

  private readonly firestore: Firestore;

  public constructor(@Inject(FIRESTORE_APP) firestore: Firestore) {
    this.firestore = firestore;
  }

  public execute(request: FirebaseRepositoryRequest): Observable<RepositoryResponse> {
    switch (request.operation) {
      case 'findAll':
      case 'findOne':
        return this.findBy(request);
      case 'findById':
        return this.findById(request);
      case 'create':
        return this.create(request);
      case 'update':
        return this.update(request);
      case 'delete':
        return this.delete(request);
    }

    throw new Error(`Operation not supported (${ request.operation })`);
  }

  public findById(request: FirebaseRepositoryRequest): Observable<RepositoryResponse> {
    return fromRef<DocumentSnapshot>(this.firestore.doc(request.path.value)).pipe(
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
    if (request.path.id != null) {
      const documentRef: DocumentReference = this.firestore.doc(request.path.value);

      return from(documentRef.set(request.body)).pipe(
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
      return from(this.firestore.collection(request.path.value).add(request.body)).pipe(
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
    return from(this.firestore.doc(request.path.value).update(request.body)).pipe(
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
    return from(this.firestore.doc(request.path.value).delete()).pipe(
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
    const query: Query = request.getQuery(this.firestore);

    return fromRef<QuerySnapshot<DocumentData>>(query).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirebaseRepositoryReadRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      map((response: QuerySnapshot<DocumentData>) => new FirebaseCollectionRepositoryResponse(response, request))
    );
  }
}

