import {TestBed} from '@angular/core/testing';
import {
  NgxFirestoreRepositoryModule,
  NgxFirestoreRepositoryModuleConfiguration,
  provideNgxFirestoreRepository
} from './ngx-firestore-repository.module';
import {LogExecuteFirestoreRequestEventListener} from './driver/listener/log-execute-firestore-request-event.listener';
import {FIRESTORE_APP} from './ngx-firestore-repository.module.di';
import {FirestoreNormalizer} from './normalizer/firestore.normalizer';


describe('NgxFirestoreRepositoryModule.forRoot', () => {
  const config: NgxFirestoreRepositoryModuleConfiguration = {
    debug: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxFirestoreRepositoryModule.forRoot(config)],
    });
  });
  testFirestoreRepository();
});
describe('provideNgxFirestoreRepositoryModule', () => {
  const config: NgxFirestoreRepositoryModuleConfiguration = {
    debug: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxFirestoreRepositoryModule],
      providers: [
        provideNgxFirestoreRepository(config),
      ]
    });
  });
  testFirestoreRepository();
});

function testFirestoreRepository() {
  it('should provide FirestoreRepositoryBuilder', () => {
    expect(() => TestBed.inject(FIRESTORE_APP)).toBeTruthy();
  });

  it('should not provide FirestoreNormalizer', () => {
    expect(() => TestBed.inject(FirestoreNormalizer)).toThrowError(/No provider for/);
  });

  it('should provide LogExecuteFirestoreRequestEventListener when debug is true', () => {
    expect(TestBed.inject(LogExecuteFirestoreRequestEventListener)).toBeTruthy();
  });
}
