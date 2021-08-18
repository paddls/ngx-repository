import { FindByIdRepository } from '../lib/core/repository/find-by-id.repository';
import { FindAllRepository } from '../lib/core/repository/find-all.repository';
import { FindOneRepository } from '../lib/core/repository/find-one.repository';
import { CreateRepository } from '../lib/core/repository/create.repository';
import { UpdateRepository } from '../lib/core/repository/update.repository';
import { PatchRepository } from '../lib/core/repository/patch.repository';
import { DeleteRepository } from '../lib/core/repository/delete.repository';
import { Observable, Subject } from 'rxjs';
import { Injectable, Predicate, Type } from '@angular/core';
import { AbstractRepository } from '../lib/core/repository/abstract-repository';


export interface AllRepository extends FindByIdRepository,
  FindAllRepository,
  FindOneRepository,
  CreateRepository,
  UpdateRepository,
  PatchRepository,
  DeleteRepository {

}

// @dynamic
@Injectable()
export class MockRepository implements AllRepository {

  private readonly values: { [key: string]: Subject<any> };

  public constructor(public readonly resourceType: Type<any>, public readonly repositoryType: Type<AbstractRepository<any>>) {
    this.values = {
      create: new Subject<any>(),
      update: new Subject<any>(),
      patch: new Subject<any>(),
      delete: new Subject<any>(),
      findAll: new Subject<any>(),
      findOne: new Subject<any>(),
      findById: new Subject<any>()
    };
  }

  public static filter(resourceType: Type<any>, repositoryType: Type<AbstractRepository<any>>): Predicate<MockRepository> {
    return (repository: MockRepository) => repository.resourceType === resourceType && repository.repositoryType === repositoryType;
  }

  public create<T, R>(object: T, query?: any): Observable<R> {
    return this.values.create;
  }

  public delete<T, R>(object: T, query?: any): Observable<R> {
    return this.values.delete;
  }

  public findAll<R>(query?: any): Observable<R> {
    return this.values.findAll;
  }

  public findById<R, K>(id: K, query?: any): Observable<R> {
    return this.values.findById;
  }

  public findOne<R>(query?: any): Observable<R> {
    return this.values.findOne;
  }

  public patch<T, R>(object: T, query?: any): Observable<R> {
    return this.values.patch;
  }

  public update<T, R>(object: T, query?: any): Observable<R> {
    return this.values.update;
  }

  public emit(operation: keyof AllRepository, value: any, complete: boolean = false): void {
    this.values[operation].next(value);
    if (complete) {
      this.complete(operation);
    }
  }

  public complete(operation: keyof AllRepository): void {
    this.values[operation].complete();
  }
}
