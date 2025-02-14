import { Injectable, Type } from '@angular/core';
import { InjectRepository, NgxRepositoryModule } from '@paddls/ngx-repository';
import { TestBed } from '@angular/core/testing';
import { Firestore, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FirestoreRepository } from '../../lib/repository/firestore.repository';
import { NgxFirestoreRepositoryModule } from '../../lib/ngx-firestore-repository.module';
import { FIRESTORE_APP } from '../../lib/ngx-firestore-repository.module.di';

export interface RepositoryContext<T> {
  repository: FirestoreRepository<T, string>;
  firestore: Firestore;
}

export function createFirestore(): Firestore {
  return getFirestore(initializeApp({
    apiKey: 'AIzaSyDSd6EXdQWaWcBMxbTYp-kFAV3zxNu-ArM',
    authDomain: 'ngx-repository.firebaseapp.com',
    databaseURL: 'https://ngx-repository.firebaseio.com',
    projectId: 'ngx-repository',
    storageBucket: 'ngx-repository.appspot.com',
    messagingSenderId: '352664344689',
    appId: '1:352664344689:web:20ec56387616cba621e3d0',
    measurementId: 'G-0RD9MTX3PB'
  }));
}

export function initializeRepository<T>(bookImpl: Type<T>, providers: any[] = []): RepositoryContext<T> {
  @Injectable()
  class BookServiceImpl {

    @InjectRepository({ resourceType: () => bookImpl, repository: () => FirestoreRepository })
    public repository: FirestoreRepository<T, number>;

  }

  TestBed.configureTestingModule({
    imports: [
      NgxRepositoryModule.forRoot(),
      NgxFirestoreRepositoryModule.forRoot()
    ],
    providers: [
      BookServiceImpl,
      {
        provide: FIRESTORE_APP,
        useFactory: createFirestore
      },
      ...providers
    ]
  });

  return {
    repository: TestBed.inject(BookServiceImpl).repository,
    firestore: TestBed.inject(FIRESTORE_APP)
  };
}
