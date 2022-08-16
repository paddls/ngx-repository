import { TokenRegistry } from './token.registry';
import { InjectionToken, Type } from '@angular/core';
import { AbstractRepository } from '../repository/abstract-repository';
import { ResourceConfiguration } from '../configuration/resource.configuration';

class MyClass {

}

class MyRepository<T> extends AbstractRepository<T> {

  public constructor() {
    super(null, null, null);
  }

  protected getResourceConfiguration(): ResourceConfiguration {
    return null;
  }
}

describe('TokenRegistry', () => {

  beforeEach(() => {
    TokenRegistry.tokenRegistry.clear();
  });

  describe('#addTokenToRegistry', () => {

    it('should add token if not existing into registry', () => {
      const resourceType: Type<MyClass> = MyClass;
      const repositoryType: Type<MyRepository<MyClass>> = MyRepository;

      expect(TokenRegistry.tokenRegistry.has(repositoryType)).toBe(false);
      TokenRegistry.addTokenToRegistry(resourceType, repositoryType);
      expect(TokenRegistry.tokenRegistry.has(repositoryType)).toBe(true);
      expect(TokenRegistry.tokenRegistry.get(repositoryType).get(resourceType)).toEqual(new InjectionToken<MyClass>(resourceType.name));
    });

    it('should add a new token behind the repository type and resource type into registry', () => {
      const resourceType: Type<MyClass> = MyClass;
      const repositoryType: Type<MyRepository<MyClass>> = MyRepository;
      const instance: InjectionToken<MyClass> = new InjectionToken<MyClass>(resourceType.name);
      const map: Map<Type<any>, InjectionToken<any>> = new Map();
      TokenRegistry.tokenRegistry.set(repositoryType, map);

      expect(TokenRegistry.tokenRegistry.has(repositoryType)).toBe(true);
      TokenRegistry.addTokenToRegistry(resourceType, repositoryType);
      expect(map.get(resourceType)).toEqual(instance);
    });
  });

  describe('#findToken', () => {

    it('should return null is token is not into registry', () => {
      const resourceType: Type<MyClass> = MyClass;
      const repositoryType: Type<MyRepository<MyClass>> = MyRepository;
      expect(TokenRegistry.findToken(resourceType, repositoryType)).toBeNull();
    });

    it('should return the token behind repository type and resource type into registry', () => {
      const resourceType: Type<MyClass> = MyClass;
      const repositoryType: Type<MyRepository<MyClass>> = MyRepository;
      const instance: InjectionToken<MyClass> = new InjectionToken<MyClass>(repositoryType.name);
      const map: Map<Type<any>, InjectionToken<any>> = new Map();

      TokenRegistry.tokenRegistry.set(repositoryType, map);
      map.set(resourceType, instance);
      expect(TokenRegistry.findToken(resourceType, repositoryType)).toBe(instance);
    });
  });

  describe('#clear', () => {
    it('should clear map', () => {
      const resourceType: Type<MyClass> = MyClass;
      const repositoryType: Type<MyRepository<MyClass>> = MyRepository;
      TokenRegistry.addTokenToRegistry(resourceType, repositoryType);

      TokenRegistry.clear();

      expect(TokenRegistry.tokenRegistry).toEqual(new Map());
    });
  });
});
