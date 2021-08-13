import { RepositoryDriver } from '../driver/repository.driver';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';

export interface RequestManagerContext {
  body: any;
  query: any;
  driver: RepositoryDriver;
  configuration: ConfigurationContextProvider;
}
