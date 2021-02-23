import { Inject, Injectable, InjectionToken, Injector, Type } from '@angular/core';
import { RepositoryBuilder } from './core/repository/repository.builder';
import { CONNECTIONS_TOKEN } from './ngx-repository.module.di';
import { TokenRegistry } from './core/registry/token.registry';
import { Repository2 } from './core/repository/repository2';

/**
 * @ignore
 */
@Injectable()
export class NgxRepositoryService {

  protected injector: Injector;

  public constructor(protected parentInjector: Injector,
                     @Inject(CONNECTIONS_TOKEN) private readonly repositoryBuilders: RepositoryBuilder[]) {
    this.injector = Injector.create({
      providers: [],
      parent: this.parentInjector
    });
  }

  public getRepository(resourceType: Type<any>, repositoryType?: Type<Repository2>): Repository2 {
    let finalRepository: Repository2 = this.searchForExistingService(repositoryType);
    if (finalRepository) {
      return finalRepository;
    }

    finalRepository = this.searchForExistingToken(resourceType, repositoryType);
    if (finalRepository) {
      return finalRepository;
    }

    return this.createNewRepository(resourceType, repositoryType);
  }

  private searchForExistingService(repositoryType?: Type<Repository2>): Repository2 {
    if (!repositoryType) {
      return null;
    }

    return this.injector.get(repositoryType, null);
  }

  private searchForExistingToken(resourceType: Type<any>, repositoryType?: Type<Repository2>): Repository2 {
    const token: InjectionToken<any> = TokenRegistry.findToken(resourceType, repositoryType);

    if (!token) {
      return null;
    }

    const repositories: Repository2 | Repository2[] = this.injector.get(token);

    if (repositories && Array.isArray(repositories)) {
      if (!repositoryType) {
        throw new Error(
          `With multiple connection types, you must have to provide the repository argument in JoinColumn, SubCollection and InjectRepository decorator of your ${ resourceType.name } resource.`
        );
      }

      return repositories.find((rep: Repository2) => rep instanceof repositoryType);
    } else {
      return repositories as Repository2;
    }
  }

  private createNewRepository(resourceType: Type<any>, repositoryType?: Type<Repository2>): Repository2 {
    if (this.repositoryBuilders.length === 0) {
      throw new Error('There is not connection configured.');
    }

    let repository: Repository2;
    if (this.repositoryBuilders.length === 1) {
      repository = this.repositoryBuilders[0].getRepository(resourceType);
    } else if (this.repositoryBuilders.length > 1) {
      if (!repositoryType) {
        throw new Error(
          `With multiple connection types, you must have to provide the repository argument in JoinColumn, SubCollection and InjectRepository decorator of your ${ resourceType.name } resource.`
        );
      }
      const connection: RepositoryBuilder = this.repositoryBuilders.find((c: RepositoryBuilder) => c.supports(repositoryType));
      if (!connection) {
        throw new Error(`There is no connection to support the repository type ${ repositoryType.name }`);
      }

      repository = connection.getRepository(resourceType);
    }

    const token: InjectionToken<Repository2> = TokenRegistry.addTokenToRegistry(resourceType, repositoryType);

    this.injector = Injector.create({
      providers: [{
        provide: token,
        useValue: repository
      }],
      parent: this.injector
    });

    return repository;
  }
}
