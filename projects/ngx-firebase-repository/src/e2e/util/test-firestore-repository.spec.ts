import { Type } from '@angular/core';
import { FirebaseRepository } from '../../lib/repository/firebase.repository';
import { forOwn } from 'lodash';
import { initializeRepository, RepositoryContext } from './repository-intializer.spec';
import { FirestoreMock } from './firestore-mock.spec';

export interface FirestoreTestContext {
  entity: Type<any>;
  request: (repository: FirebaseRepository<any>) => Promise<any>;
  expectedPath: string;
  expectedResponse: any;
  expectedRequest: (firestore: FirestoreMock, path: string) => void;
  mockedResponse: any;
}

export function testFirestoreRepository(tests: { [key: string]: Partial<FirestoreTestContext> }): void {
  forOwn(tests, (context: Partial<FirestoreTestContext>, name: string) => {
    it(name, async () => {
      const {repository, firestore}: RepositoryContext<any> = initializeRepository(context.entity);

      firestore.mock(context.expectedPath, context.mockedResponse);

      const response: any = await context.request(repository);

      expect(response).toEqual(context.expectedResponse);
      if (context.expectedRequest) {
        context.expectedRequest(firestore, context.expectedPath);
      }
    });
  });
}

export function expectCollectionAdd(value: any): (firestore: FirestoreMock, path: string) => void {
  return (firestore: FirestoreMock, path: string) => {
    expect(firestore.collectionAdd).toHaveBeenCalledWith(path, value);
  };
}

export function expectDocumentUpdate(value: any): (firestore: FirestoreMock, path: string) => void {
  return (firestore: FirestoreMock, path: string) => {
    expect(firestore.documentUpdate).toHaveBeenCalledWith(path, value);
  };
}

export function expectDocumentDelete(): (firestore: FirestoreMock, path: string) => void {
  return (firestore: FirestoreMock, path: string) => {
    expect(firestore.documentDelete).toHaveBeenCalledWith(path);
  };
}
