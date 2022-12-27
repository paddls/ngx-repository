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
export class MockRepository<T> implements AllRepository {

  private readonly values: { [key: string]: Subject<any> };

  public constructor(public readonly resourceType: Type<any>,
                     public readonly repositoryType: Type<AbstractRepository<T>>) {
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

  public static filter<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): Predicate<MockRepository<T>> {
    return (repository: MockRepository<T>) => repository.resourceType === resourceType && repository.repositoryType === repositoryType;
  }

  public create<R>(): Observable<R> {
    return this.values.create;
  }

  public delete<R>(): Observable<R> {
    return this.values.delete;
  }

  public findAll<R>(): Observable<R> {
    return this.values.findAll;
  }

  public findById<R>(): Observable<R> {
    return this.values.findById;
  }

  public findOne<R>(): Observable<R> {
    return this.values.findOne;
  }

  public patch<R>(): Observable<R> {
    return this.values.patch;
  }

  public update<R>(): Observable<R> {
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
