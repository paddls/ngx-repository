import { RepositoryBuilder } from './repository.builder';
import { REPOSITORY_METADATA_KEY, RESOURCE_CONFIGURATION_METADATA_KEY } from '../decorator/repository.decorator';
import { Type } from '@angular/core';
import {AbstractRepository} from './abstractRepository';

class MyClass {}

class MyConnection extends RepositoryBuilder {

  public constructor(resourceContextKey: string) {
    super(resourceContextKey);
  }

  public getRepositoryInstance<T, K, Q>(resourceType: new(...args: any) => T): AbstractRepository {
    return undefined;
  }

  public supports<T, K>(repositoryType: Type<AbstractRepository>): boolean {
    return false;
  }
}

describe('Connection', () => {

  it('should throw an error when no metadata exist', () => {
    const connection: MyConnection = new MyConnection('meta');
    expect(() => connection.getRepository(MyClass)).toThrow();
  });

  it('should return a repository instance', () => {
    const meta: any = {};
    const repository: any = {};
    const connection: MyConnection = new MyConnection('meta');

    Reflect.defineMetadata('meta', meta, MyClass);
    spyOn(connection, 'getRepositoryInstance').and.returnValue(repository);

    const repositoryInstance: any = connection.getRepository(MyClass);
    expect(connection.getRepositoryInstance).toHaveBeenCalledTimes(1);
    expect(connection.getRepositoryInstance).toHaveBeenCalledWith(MyClass);
    expect(repositoryInstance).toBe(repository);
    expect(Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, repositoryInstance)).toBe(meta);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance).resourceType instanceof Function).toBe(true);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, repositoryInstance).resourceType()).toEqual(MyClass);
  });
});
