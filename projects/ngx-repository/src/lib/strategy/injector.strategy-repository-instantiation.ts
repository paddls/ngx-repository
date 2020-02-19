import {AbstractRepository, AbstractStrategyRepositoryInstantiation} from '@witty-services/repository-core';
import {Injectable, Injector} from '@angular/core';

@Injectable()
export class InjectorStrategyRepositoryInstantiation implements AbstractStrategyRepositoryInstantiation {

  public constructor(private injector: Injector) {}

  public get(repository: new (...args: any[]) => AbstractRepository<any, any, any, any>): AbstractRepository<any, any, any, any> {
    return this.injector.get(repository);
  }
}
