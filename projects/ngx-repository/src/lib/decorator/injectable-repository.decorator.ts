import {Injectable, Type} from '@angular/core';
import {AbstractRepository, Repository} from '@witty-services/repository-core';

export interface InjectableRepositoryContext extends Injectable {
  type: Type<any>;
  path: string;
}

export function InjectableRepository(params: InjectableRepositoryContext): any {
  return (target: AbstractRepository<any, any, any>): void => {
    Injectable({providedIn: params.providedIn})(target);
    Repository(params)(target);
  };
}
