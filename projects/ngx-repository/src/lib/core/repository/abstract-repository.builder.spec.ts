import { REPOSITORY_METADATA_KEY, RESOURCE_CONFIGURATION_METADATA_KEY } from '../decorator/repository.decorator';
import { Type } from '@angular/core';
import { AbstractRepository } from './abstract-repository';
import { AbstractRepositoryBuilder } from './abstract-repository.builder';
import { Observable } from 'rxjs';
import { RequestManager } from '../manager/request.manager';
import { RepositoryDriver } from '../driver/repository.driver';
import { ResourceConfiguration } from '../configuration/resource.configuration';

class MyClass {
}

class MyRepository extends AbstractRepository {

  public constructor(requestManager: RequestManager = null, driver: RepositoryDriver = null, configuration: ResourceConfiguration = {}) {
    super(requestManager, driver, configuration);
  }

  public execute(body: any, query: any, configurationPaths: string[]): Observable<any> {
    return super.execute(body, query, configurationPaths);
  }

  protected getResourceConfiguration(): ResourceConfiguration {
    return null;
  }

}

class RepositoryBuilder extends AbstractRepositoryBuilder {

  public constructor(resourceContextKey: string) {
    super(resourceContextKey);
  }

  public getRepositoryInstance<T>(resourceType: Type<T>): MyRepository {
    const repositoryClass: Type<MyRepository> = this.createRepositoryClass(MyRepository, resourceType);

    return new repositoryClass();
  }

  public supports(): boolean {
    return false;
  }
}

describe('AbstractRepositoryBuilder', () => {

  it('should throw an error when no metadata exist on resource class', () => {
    class MyClassWithoutMetadata {
    }

    const repositoryBuilder: RepositoryBuilder = new RepositoryBuilder('meta');
    expect(() => repositoryBuilder.getRepository(MyClassWithoutMetadata)).toThrowError('MyClassWithoutMetadata is not a valid resource.');
  });

  it('should return a repository instance', () => {
    const meta: any = {};
    const repositoryBuilder: RepositoryBuilder = new RepositoryBuilder('meta');

    Reflect.defineMetadata('meta', meta, MyClass);

    const repositoryInstance: any = repositoryBuilder.getRepository(MyClass);
    expect(repositoryInstance instanceof MyRepository).toBe(true);
    expect(Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, repositoryInstance)).toBe(meta);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance).resourceType instanceof Function).toBe(true);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance).resourceType()).toEqual(MyClass);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance.constructor).resourceType()).toEqual(MyClass);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance.constructor).defaultConfiguration.responseType()).toEqual(MyClass);
  });

  it('should throw an error when no metadata exist on repository class', () => {
    Reflect.defineMetadata('meta', {}, MyClass);

    class FakeRepositoryBuilder extends AbstractRepositoryBuilder {

      public constructor(resourceContextKey: string) {
        super(resourceContextKey);
      }

      public getRepositoryInstance(): AbstractRepository {
        return new MyRepository();
      }

      public supports(): boolean {
        return false;
      }
    }

    const repositoryBuilder: FakeRepositoryBuilder = new FakeRepositoryBuilder('meta');
    expect(() => repositoryBuilder.getRepository(MyClass)).toThrowError('There is no Resource type configuration for this repository.');
  });
});
