import {InjectionToken, Type} from '@angular/core';
import {AbstractRepository} from '../repository/abstract.repository';

/**
 * @ignore
 */
export class TokenRegistry {

  private static tokenRegistry: Map<Type<AbstractRepository<any, any, any, any>>, Map<new(...args: any) => any, InjectionToken<any>>> = new Map();

  public static addTokenToRegistry<T>(resourceType: new(...args: any) => T, registry: Type<AbstractRepository<T, any, any, any>>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      TokenRegistry.tokenRegistry.set(registry, new Map<any, InjectionToken<any>>());
    }

    const token: InjectionToken<T> = new InjectionToken<T>(resourceType.name);
    TokenRegistry.tokenRegistry.get(registry).set(resourceType, token);

    return token;
  }

  public static findToken<T>(resourceType: new(...args: any) => T, registry: Type<AbstractRepository<T, any, any, any>>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      return null;
    }

    return TokenRegistry.tokenRegistry.get(registry).get(resourceType);
  }
}
