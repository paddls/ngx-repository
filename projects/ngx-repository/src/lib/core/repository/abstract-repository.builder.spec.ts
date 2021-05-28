import {REPOSITORY_METADATA_KEY, RESOURCE_CONFIGURATION_METADATA_KEY} from '../decorator/repository.decorator';
import {Type} from '@angular/core';
import {AbstractRepository} from './abstract-repository';
import {AbstractRepositoryBuilder} from './abstract-repository.builder';

class MyClass {
}

class RepositoryBuilder extends AbstractRepositoryBuilder {

  public constructor(resourceContextKey: string) {
    super(resourceContextKey);
  }

  public getRepositoryInstance<T>(resourceType: Type<T>): AbstractRepository<T> {
    const repositoryClass: Type<MyRepository<T>> = this.createRepositoryClass<T>(MyRepository, resourceType);

    return new repositoryClass();
  }

  public supports<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): boolean {
    return false;
  }
}

class MyRepository<T> extends AbstractRepository<T> {

  public constructor() {
    super(null, null);
  }

  protected getResourceContextKey(): string {
    return '';
  }

}

describe('AbstractRepositoryBuilder', () => {

  it('should throw an error when no metadata exist', () => {
    class MyClassWithoutMetadata {}

    const repositoryBuilder: RepositoryBuilder = new RepositoryBuilder('meta');
    expect(() => repositoryBuilder.getRepository(MyClassWithoutMetadata, MyRepository)).toThrow();
  });

  it('should return a repository instance', () => {
    const meta: any = {};
    const repositoryBuilder: RepositoryBuilder = new RepositoryBuilder('meta');

    Reflect.defineMetadata('meta', meta, MyClass);

    const repositoryInstance: any = repositoryBuilder.getRepository(MyClass, MyRepository);
    expect(repositoryInstance instanceof MyRepository).toBe(true);
    expect(Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, repositoryInstance)).toBe(meta);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance).resourceType instanceof Function).toBe(true);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance).resourceType()).toEqual(MyClass);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance.constructor).resourceType()).toEqual(MyClass);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance.constructor).defaultConfiguration.responseType()).toEqual(MyClass);
  });
});
