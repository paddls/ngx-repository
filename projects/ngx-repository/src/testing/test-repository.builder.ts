import { Injectable, Type } from '@angular/core';
import { RepositoryBuilder } from '../lib/core/repository/repository.builder';
import { AbstractRepository } from '../lib/core/repository/abstractRepository';
import { MockRepository } from './mock.repository';

@Injectable()
export class TestRepositoryBuilder implements RepositoryBuilder {

  private readonly repositories: MockRepository[] = [];

  public supports<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): boolean {
    return true;
  }

  public getRepository<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): AbstractRepository<T> {
    let repository: MockRepository = this.repositories.find(MockRepository.filter(resourceType, repositoryType));

    if (repository == null) {
      repository = new MockRepository(resourceType, repositoryType);
      this.repositories.push(repository);
    }

    return repository as any;
  }
}

