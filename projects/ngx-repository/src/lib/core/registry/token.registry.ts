import { InjectionToken, Type } from '@angular/core';
import { AbstractRepository } from '../repository/abstract-repository';

/**
 * @ignore
 */
export class TokenRegistry {

  public static readonly tokenRegistry: Map<Type<AbstractRepository<any>>, Map<Type<any>, InjectionToken<any>>> = new Map();

  public static addTokenToRegistry<T>(resourceType: Type<T>, repository: Type<AbstractRepository<T>>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(repository)) {
      TokenRegistry.tokenRegistry.set(repository, new Map<any, InjectionToken<any>>());
    }

    const token: InjectionToken<T> = new InjectionToken<T>(resourceType.name);
    TokenRegistry.tokenRegistry.get(repository).set(resourceType, token);

    return token;
  }

  public static findToken<T>(resourceType: Type<T>, repository: Type<AbstractRepository<T>>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(repository)) {
      return null;
    }

    return TokenRegistry.tokenRegistry.get(repository).get(resourceType);
  }

  public static clear(): void {
    TokenRegistry.tokenRegistry.clear();
  }
}
