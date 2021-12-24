import { Injectable, Type } from '@angular/core';
import { InjectRepository, NgxRepositoryModule } from '@witty-services/ngx-repository';
import { TestBed } from '@angular/core/testing';
import { FirebaseRepository, FIRESTORE_APP, NgxFirebaseRepositoryModule } from '../../public-api';
import { FirestoreMock } from './firestore-mock.spec';
import { Firestore } from 'firebase/firestore';

export interface RepositoryContext<T> {
  repository: FirebaseRepository<T, string>;
  firestore: FirestoreMock;
}

export function mockCollection(firestore: Firestore, value: any): void {
  // firestore.doc = () => null;
  // spyOn(firestore, 'collection').and.returnValue({
  //   onSnapshot: (subscriber: any) => {
  //     subscriber.next(value);
  //     subscriber.complete();
  //   }
  // } as any);
}

export function initializeRepository<T>(bookImpl: Type<T>, providers: any[] = []): RepositoryContext<T> {
  @Injectable()
  class BookServiceImpl {

    @InjectRepository({resourceType: () => bookImpl, repository: () => FirebaseRepository})
    public repository: FirebaseRepository<T, number>;

  }

  TestBed.configureTestingModule({
    imports: [
      NgxRepositoryModule.forRoot(),
      NgxFirebaseRepositoryModule.forRoot()
    ],
    providers: [
      BookServiceImpl,
      {
        provide: FIRESTORE_APP,
        useClass: FirestoreMock
      },
      ...providers
    ]
  });

  return {
    repository: TestBed.get(BookServiceImpl).repository,
    firestore: TestBed.get(FIRESTORE_APP)
  };
}
