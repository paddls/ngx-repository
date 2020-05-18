import {InjectionToken} from '@angular/core';

export class TokenRegistry {

  private static tokenRegistry: Map<string, Map<string, InjectionToken<any>>> = new Map<string, Map<string, InjectionToken<any>>>(
    [['general', new Map<string, InjectionToken<any>>()]]
  );

  public static addTokenToRegistry<T>(tokenKey: string, registry: string = 'general'): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      TokenRegistry.tokenRegistry.set(registry, new Map<string, InjectionToken<any>>());
    }

    const token: InjectionToken<T> = new InjectionToken<T>(tokenKey);
    TokenRegistry.tokenRegistry.get(registry).set(tokenKey, token);

    return token;
  }

  public static findToken<T>(tokenKey: string, registry: string = 'general'): InjectionToken<T> {
    if (!TokenRegistry.tokenRegistry.has(registry)) {
      return null;
    }

    return TokenRegistry.tokenRegistry.get(registry).get(tokenKey);
  }
}
