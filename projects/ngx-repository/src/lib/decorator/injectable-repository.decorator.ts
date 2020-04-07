import {Injectable} from '@angular/core';
import {AbstractRepository, Repository} from '@witty-services/repository-core';
import {RepositoryContext} from '@witty-services/repository-core/dist/decorator/repository.decorator';

export interface InjectableRepositoryContext extends Injectable, RepositoryContext {
}

export function InjectableRepository(params: InjectableRepositoryContext): any {
  return (target: AbstractRepository<any, any, any, any, any>): void => {
    Injectable({providedIn: params.providedIn})(target);
    Repository(params)(target);
  };
}
