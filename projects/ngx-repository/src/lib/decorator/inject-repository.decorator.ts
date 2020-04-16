import {Connection} from '../connection/connection';
import {NgxRepositoryModule} from '../ngx-repository.module';

export const INJECT_REPOSITORY_METADATA_KEY: string = 'httpQueryParam';

export interface InjectRepositoryContext {
  type: new(...args: any[]) => any;
  connection: new(...args: any) => Connection<any, any, any>;
}

export interface InjectRepositoryContextConfiguration extends InjectRepositoryContext {
  propertyKey: string;
}

export function InjectRepository(params: InjectRepositoryContext): any {
  return (target: any, propertyKey: string) => {
    const injectRepositoryContextConfiguration: InjectRepositoryContextConfiguration = {
      propertyKey,
      ...params
    };

    let metas: InjectRepositoryContextConfiguration[] = [];
    if (Reflect.hasMetadata(INJECT_REPOSITORY_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, target);
    }
    Reflect.defineMetadata(INJECT_REPOSITORY_METADATA_KEY, metas.concat(injectRepositoryContextConfiguration), target);

    Object.defineProperty(target, propertyKey, {
      get: () => NgxRepositoryModule.injector
        .get(injectRepositoryContextConfiguration.connection)
        .getRepository(injectRepositoryContextConfiguration.type),
      set: (newValue: any) => void 0,
      enumerable: true,
      configurable: true
    });
  };
}

