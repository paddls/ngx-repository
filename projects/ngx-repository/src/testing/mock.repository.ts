import { FindByIdRepository } from '../lib/core/repository/find-by-id.repository';
import { FindAllRepository } from '../lib/core/repository/find-all.repository';
import { FindOneRepository } from '../lib/core/repository/find-one.repository';
import { CreateRepository } from '../lib/core/repository/create.repository';
import { UpdateRepository } from '../lib/core/repository/update.repository';
import { PatchRepository } from '../lib/core/repository/patch.repository';
import { DeleteRepository } from '../lib/core/repository/delete.repository';
import { Observable, throwError } from 'rxjs';
import { Injectable, Predicate, Type } from '@angular/core';
import { AbstractRepository } from '../lib/core/repository/abstractRepository';

// @dynamic
@Injectable()
export class MockRepository implements FindByIdRepository,
  FindAllRepository,
  FindOneRepository,
  CreateRepository,
  UpdateRepository,
  PatchRepository,
  DeleteRepository {

  private static readonly ERROR_MESSAGE: string = 'MockRepository method should be mocked';

  public constructor(public readonly resourceType: Type<any>, public readonly repositoryType: Type<AbstractRepository<any>>) {
  }

  public static filter(resourceType: Type<any>, repositoryType: Type<AbstractRepository<any>>): Predicate<MockRepository> {
    return (repository: MockRepository) => repository.resourceType === resourceType && repository.repositoryType === repositoryType;
  }

  public create<T, R>(object: T, query?: any): Observable<R> {
    return throwError(MockRepository.ERROR_MESSAGE);
  }

  public delete<T, R>(object: T, query?: any): Observable<R> {
    return throwError(MockRepository.ERROR_MESSAGE);
  }

  public findAll<R>(query?: any): Observable<R> {
    return throwError(MockRepository.ERROR_MESSAGE);
  }

  public findById<R, K>(id: K): Observable<R> {
    return throwError(MockRepository.ERROR_MESSAGE);
  }

  public findOne<R>(query?: any): Observable<R> {
    return throwError(MockRepository.ERROR_MESSAGE);
  }

  public patch<T, R>(object: T, query?: any): Observable<R> {
    return throwError(MockRepository.ERROR_MESSAGE);
  }

  public update<T, R>(object: T, query?: any): Observable<R> {
    return throwError(MockRepository.ERROR_MESSAGE);
  }
}