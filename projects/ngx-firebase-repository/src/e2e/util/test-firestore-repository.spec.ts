import { Type } from '@angular/core';
import { FirebaseRepository } from '../../lib/repository/firebase.repository';
import { forOwn } from 'lodash';
import { initializeRepository, RepositoryContext } from './repository-intializer.spec';
import { addDoc, deleteDoc, updateDoc } from '../../lib/firestore';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import { FirestoreMock } from './firestore-mock.spec';

export interface FirestoreTestContext {
  entity: Type<any>;
  request: (repository: FirebaseRepository<any>) => Promise<any>;
  expectedPath: string;
  expectedResponse: any;
  expectedRequest: (reference: { path: string }) => void;
  mockedResponse: any;
}

export function testFirestoreRepository(tests: { [key: string]: Partial<FirestoreTestContext> }): void {
  forOwn(tests, (context: Partial<FirestoreTestContext>, name: string) => {
    it(name, async () => {
      const {repository}: RepositoryContext<any> = initializeRepository(context.entity);

      FirestoreMock.mock(context.expectedPath, context.mockedResponse);

      const response: any = await context.request(repository);

      expect(response).toEqual(context.expectedResponse);
      if (context.expectedRequest) {
        context.expectedRequest({path: context.expectedPath});
      }
    });
  });
}

export function expectCollectionAdd<T>(value: any): (reference: CollectionReference<T>) => void {
  return (reference: CollectionReference<T>) => {
    expect(addDoc).toHaveBeenCalledWith(reference, value);
  };
}

export function expectDocumentUpdate<T>(value: any): (reference: DocumentReference<T>) => void {
  return (reference: DocumentReference<T>) => {
    expect(updateDoc as any).toHaveBeenCalledWith(reference, value);
  };
}

export function expectDocumentDelete<T>(): (reference: DocumentReference<T>) => void {
  return (reference: DocumentReference<T>) => {
    expect(deleteDoc).toHaveBeenCalledWith(reference);
  };
}
