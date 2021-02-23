import { InjectionToken, Type } from '@angular/core';
import { Repository2 } from '../repository/repository2';

/**
 * @ignore
 */
export class TokenRegistry {

  private static tokenRegistry: Map<Type<Repository2>, Map<Type<any>, InjectionToken<any>>> = new Map();

  public static addTokenToRegistry<T>(resourceType: Type<T>, registry: Type<Repository2>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      TokenRegistry.tokenRegistry.set(registry, new Map<any, InjectionToken<any>>());
    }

    const token: InjectionToken<T> = new InjectionToken<T>(resourceType.name);
    TokenRegistry.tokenRegistry.get(registry).set(resourceType, token);

    return token;
  }

  public static findToken<T>(resourceType: Type<T>, registry: Type<Repository2>): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      return null;
    }

    return TokenRegistry.tokenRegistry.get(registry).get(resourceType);
  }
}
