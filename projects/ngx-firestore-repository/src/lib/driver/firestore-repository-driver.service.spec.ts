import { TestBed } from '@angular/core/testing';
import { FIRESTORE_APP } from '../ngx-firestore-repository.module.di';
import { Observable, throwError } from 'rxjs';
import { FirestoreRepositoryDriver } from './firestore-repository-driver.service';
import { FirestoreCriteriaRepositoryRequest } from '../request/firestore-criteria-repository.request';
import { NgxFirestoreRepositoryReadRequestError } from '../error/ngx-firestore-repository-read-request.error';
import { FirestoreRepositoryRequest } from '../request/firestore-repository.request';
import { addMatchers, cold, initTestScheduler } from 'jasmine-marbles';
import { PublisherService } from '@paddls/ngx-repository';
import * as FromRefFunctions from './from-ref.function';

xdescribe('FirestoreRepositoryDriver', () => {

  let driver: FirestoreRepositoryDriver;

  beforeEach(() => {
    initTestScheduler();
    addMatchers();

    TestBed.configureTestingModule({
      providers: [
        FirestoreRepositoryDriver,
        {
          provide: FIRESTORE_APP,
          useValue: {}
        }
      ]
    });

    spyOn(FromRefFunctions, 'fromRef').and.callFake(() => throwError({name: 'FirebaseError'}));

    driver = TestBed.inject(FirestoreRepositoryDriver);

    PublisherService.getInstance = () => ({
      publish: () => void 0
    }) as any;
  });

  it('should throw new NgxFirestoreRepositoryReadRequestError on findBy FirebaseError', () => {
    const request: FirestoreRepositoryRequest = new FirestoreCriteriaRepositoryRequest('findAll', {value: '/books'} as any, null, null);
    spyOn(request as FirestoreCriteriaRepositoryRequest, 'getQuery').and.returnValue(null);
    const expectedError: any = new NgxFirestoreRepositoryReadRequestError(request, {name: 'FirebaseError'} as any);

    const result$: Observable<any> = driver.execute(request);

    expect(result$).toBeObservable(cold('#', undefined, expectedError));
  });
});
