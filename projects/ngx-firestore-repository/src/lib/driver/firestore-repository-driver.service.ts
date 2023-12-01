import { Inject, Injectable } from '@angular/core';
import { FirestoreRepositoryRequest } from '../request/firestore-repository.request';
import { from, Observable, throwError } from 'rxjs';
import { PublisherService, RepositoryDriver, RepositoryResponse } from '@paddls/ngx-repository';
import { FIRESTORE_APP } from '../ngx-firestore-repository.module.di';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { NgxFirestoreRepositoryReadRequestError } from '../error/ngx-firestore-repository-read-request.error';
import { FirestoreCollectionRepositoryResponse } from '../response/firestore-collection-repository.response';
import { fromRef } from './from-ref.function';
import { FirestoreDocumentRepositoryResponse } from '../response/firestore-document-repository.response';
import { NgxFirestoreRepositoryCreateRequestError } from '../error/ngx-firestore-repository-create-request.error';
import { FirestoreDocumentReferenceRepositoryResponse } from '../response/firestore-document-reference-repository.response';
import { NgxFirestoreRepositoryUpdateRequestError } from '../error/ngx-firestore-repository-update-request.error';
import { NgxFirestoreRepositoryDeleteRequestError } from '../error/ngx-firestore-repository-delete-request.error';
import { FirestoreEmptyRepositoryResponse } from '../response/firestore-empty-repository.response';
import { FirestoreCriteriaRepositoryRequest } from '../request/firestore-criteria-repository.request';
import { BeforeExecuteFirestoreRequestEvent } from './event/before-execute-firestore-request.event';
import { FirestoreRepositoryResponse } from '../response/firestore-repository.response';
import { AfterExecuteFirestoreRequestEvent } from './event/after-execute-firestore-request.event';
import { DocumentReference, DocumentSnapshot, Firestore, Query, QuerySnapshot } from 'firebase/firestore';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from '../firestore-functions';

// @dynamic
@Injectable()
export class FirestoreRepositoryDriver implements RepositoryDriver {

  public constructor(@Inject(FIRESTORE_APP) private readonly firestore: Firestore) {
  }

  public execute(request: FirestoreRepositoryRequest): Observable<FirestoreRepositoryResponse> {
    PublisherService.getInstance().publish(new BeforeExecuteFirestoreRequestEvent({request}));

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
        throw new Error(`Operation not supported (${ request.operation })`);
    }

    return obs$.pipe(
      tap((response: FirestoreRepositoryResponse) => PublisherService.getInstance().publish(new AfterExecuteFirestoreRequestEvent({
        request,
        response
      })))
    );
  }

  public findById(request: FirestoreRepositoryRequest): Observable<RepositoryResponse> {
    return fromRef(doc(this.firestore, request.path.value)).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirestoreRepositoryReadRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      map((response: DocumentSnapshot) => new FirestoreDocumentRepositoryResponse(response, request))
    );
  }

  public create(request: FirestoreRepositoryRequest): Observable<RepositoryResponse> {
    if (request?.path?.id?.value != null) {
      const documentRef: DocumentReference = doc(this.firestore, request.path.value);

      return from(setDoc(documentRef, request.body)).pipe(
        mapTo(documentRef),
        catchError((err: any) => {
          if (err.name === 'FirebaseError') {
            return throwError(new NgxFirestoreRepositoryCreateRequestError(request, err));
          } else {
            return throwError(err);
          }
        }),
        map((response: DocumentReference) => new FirestoreDocumentReferenceRepositoryResponse(response, request))
      );
    } else {
      return from(addDoc(collection(this.firestore, request.path.value), request.body)).pipe(
        catchError((err: any) => {
          if (err.name === 'FirebaseError') {
            return throwError(new NgxFirestoreRepositoryCreateRequestError(request, err));
          } else {
            return throwError(err);
          }
        }),
        map((response: DocumentReference) => new FirestoreDocumentReferenceRepositoryResponse(response, request))
      );
    }
  }

  public update(request: FirestoreRepositoryRequest): Observable<RepositoryResponse> {
    return from(updateDoc(doc(this.firestore, request.path.value), request.body)).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirestoreRepositoryUpdateRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      mapTo(new FirestoreEmptyRepositoryResponse(request))
    );
  }

  public delete(request: FirestoreRepositoryRequest): Observable<RepositoryResponse> {
    return from(deleteDoc(doc(this.firestore, request.path.value))).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirestoreRepositoryDeleteRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      mapTo(new FirestoreEmptyRepositoryResponse(request))
    );
  }

  protected findBy(request: FirestoreRepositoryRequest): Observable<RepositoryResponse> {
    if (!(request instanceof FirestoreCriteriaRepositoryRequest)) {
      throw new Error('Request must be typeof FirestoreCriteriaRepositoryRequest');
    }

    const query: Query = (request as FirestoreCriteriaRepositoryRequest).getQuery(this.firestore);

    return fromRef<QuerySnapshot>(query).pipe(
      catchError((err: any) => {
        if (err.name === 'FirebaseError') {
          return throwError(new NgxFirestoreRepositoryReadRequestError(request, err));
        } else {
          return throwError(err);
        }
      }),
      map((response: QuerySnapshot) => new FirestoreCollectionRepositoryResponse(response, request))
    );
  }
}

