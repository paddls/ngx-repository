import { TestBed } from '@angular/core/testing';
import {
  NgxHttpRepositoryModule,
  NgxHttpRepositoryModuleConfiguration,
  provideNgxHttpRepositoryModule
} from './ngx-http-repository.module';
import { LogExecuteHttpRequestEventListener } from './driver/listener/log-execute-http-request-event.listener';
import { HTTP_REPOSITORY_CONFIGURATION } from './configuration/http-repository.configuration';
import { HttpRepositoryBuilder } from './repository/http-repository.builder';

describe('NgxHttpRepositoryModule.forRoot', () => {
  const config: NgxHttpRepositoryModuleConfiguration = {
    debug: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxHttpRepositoryModule.forRoot(config)]
    });
  });
  testHttpRepository();
});

describe('provideNgxHttpRepositoryModule', () => {
  const config: NgxHttpRepositoryModuleConfiguration = {
    debug: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNgxHttpRepositoryModule(config)
      ]
    });
  });
  testHttpRepository();
});

function testHttpRepository() {

  it('should provide HttpRepositoryBuilder', () => {
    expect(() => TestBed.inject(HTTP_REPOSITORY_CONFIGURATION)).toBeTruthy();
  });

  it('should not provide HttpRepositoryDriver', () => {
    expect(() => TestBed.inject(HttpRepositoryBuilder)).toThrowError(/No provider for/);
  });

  it('should provide LogExecuteHttpRequestEventListener when debug is true', () => {
    expect(TestBed.inject(LogExecuteHttpRequestEventListener)).toBeTruthy();
  });
}
