import {HttpClient} from '@angular/common/http';
import {Injectable, Type} from '@angular/core';
import {InjectRepository, NgxRepositoryModule, provideNgxRepositoryModule} from '@paddls/ngx-repository';
import {HttpRepository} from '../../lib/repository/http.repository';
import {TestBed} from '@angular/core/testing';
import {NgxHttpRepositoryModule, provideNgxHttpRepositoryModule} from '../../lib/ngx-http-repository.module';

export interface RepositoryContext<T> {
  repository: HttpRepository<T, number>;
  httpClient: HttpClient;
}

export function initializeRepository<T>(bookImpl: Type<T>, providers: any[] = []): RepositoryContext<T> {
  @Injectable()
  class BookServiceImpl {

    @InjectRepository({ resourceType: () => bookImpl, repository: () => HttpRepository })
    public repository: HttpRepository<T, number>;

  }

  TestBed.configureTestingModule({
    imports: [
      NgxRepositoryModule,
      NgxHttpRepositoryModule
    ],
    providers: [
      provideNgxRepositoryModule(),
      provideNgxHttpRepositoryModule(),
      BookServiceImpl,
      ...providers
    ]
  });

  return {
    httpClient: TestBed.inject(HttpClient),
    repository: TestBed.inject(BookServiceImpl).repository
  };
}
