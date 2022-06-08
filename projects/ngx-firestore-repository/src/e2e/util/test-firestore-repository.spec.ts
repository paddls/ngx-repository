import { Type } from '@angular/core';
import { FirestoreRepository } from '../../lib/repository/firestore.repository';
import { initializeRepository, RepositoryContext } from './repository-intializer.spec';
import { addDoc, deleteDoc, query, updateDoc } from '../../lib/firestore-functions';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import { FirestoreMock } from './firestore-mock.spec';
import { forOwn } from '@paddls/ngx-repository';

export interface FirestoreTestContext {
  entity: Type<any>;
  request: (repository: FirestoreRepository<any>) => Promise<any>;
  expectedPath: string;
  expectedResponse: any;
  expectedQuery: any;
  expectedRequest: (reference: { path: string }) => void;
  mockedResponse: any;
}

export function testFirestoreRepository(tests: { [key: string]: Partial<FirestoreTestContext> }): void {
  forOwn(tests, (context: Partial<FirestoreTestContext>, name: string) => {
    beforeEach(() => {
      FirestoreMock.reset();
      (addDoc as any).calls.reset();
      (updateDoc as any).calls.reset();
      (deleteDoc as any).calls.reset();
    });

    it(name, async () => {
      const {repository}: RepositoryContext<any> = initializeRepository(context.entity);

      FirestoreMock.mock(context.expectedPath, context.mockedResponse);

      const response: any = await context.request(repository);

      expect(response).toEqual(context.expectedResponse);
      if (context.expectedRequest) {
        context.expectedRequest({path: context.expectedPath});
      }
      if (context.expectedQuery) {
        context.expectedQuery();
      }
    });
  });
}

export function expectCollectionAdd<T>(value: any): (reference: CollectionReference<T>) => void {
  return (reference: CollectionReference<T>) => {
    expect(addDoc as any).toHaveBeenCalledOnceWith({type: 'collection', ...reference}, value);
  };
}

export function expectDocumentUpdate<T>(value: any): (reference: DocumentReference<T>) => void {
  return (reference: DocumentReference<T>) => {
    expect(updateDoc as any).toHaveBeenCalledOnceWith({type: 'document', ...reference}, value);
  };
}

export function expectDocumentDelete<T>(): (reference: DocumentReference<T>) => void {
  return (reference: DocumentReference<T>) => {
    expect(deleteDoc as any).toHaveBeenCalledOnceWith({type: 'document', ...reference});
  };
}

export function expectQuery(type: string, args: any): () => void {
  return () => {
    expect(query as any).toHaveBeenCalledWith(jasmine.anything(), {type, data: {...args}});
  };
}
