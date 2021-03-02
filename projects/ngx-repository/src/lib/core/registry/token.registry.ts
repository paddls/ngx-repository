import { InjectionToken, Type } from '@angular/core';
import { AbstractRepository } from '../repository/abstractRepository';

/**
 * @ignore
 */
export class TokenRegistry {

  private static tokenRegistry: Map<Type<AbstractRepository<any>>, Map<Type<any>, InjectionToken<any>>> = new Map();

  public static addTokenToRegistry<T>(resourceType: Type<T>, registry: Type<AbstractRepository<T>>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      TokenRegistry.tokenRegistry.set(registry, new Map<any, InjectionToken<any>>());
    }

    const token: InjectionToken<T> = new InjectionToken<T>(resourceType.name);
    TokenRegistry.tokenRegistry.get(registry).set(resourceType, token);

    return token;
  }

  public static findToken<T>(resourceType: Type<T>, registry: Type<AbstractRepository<T>>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      return null;
    }

    return TokenRegistry.tokenRegistry.get(registry).get(resourceType);
  }
}
