import {InjectionToken} from '@angular/core';

/**
 * @ignore
 */
export class TokenRegistry {

  private static tokenRegistry: Map<string, Map<string, InjectionToken<any>>> = new Map<string, Map<string, InjectionToken<any>>>(
    [['general', new Map<any, InjectionToken<any>>()]]
  );

  public static addTokenToRegistry<T>(tokenKey: any, registry: string = 'general'): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      TokenRegistry.tokenRegistry.set(registry, new Map<any, InjectionToken<any>>());
    }

    const token: InjectionToken<T> = new InjectionToken<T>(tokenKey);
    TokenRegistry.tokenRegistry.get(registry).set(tokenKey, token);

    return token;
  }

  public static findToken<T>(tokenKey: any, registry: string = 'general'): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      return null;
    }

    return TokenRegistry.tokenRegistry.get(registry).get(tokenKey);
  }
}
