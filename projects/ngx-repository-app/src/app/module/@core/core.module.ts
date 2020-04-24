import {NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {LibraryService} from './service/library.service';
import {PersonService} from './service/person.service';
import {PersonRepository} from './repository/person.repository';
import { ClientService } from './service/client.service';
import {MyHttpCreateResponseBuilder} from './response-builder/my-http-create.response-builder';

const REPOSITORIES: Provider[] = [
  PersonRepository
];

const SERVICES: Provider[] = [
  LibraryService,
  PersonService,
  ClientService
];

@NgModule({
  providers: [
    ...REPOSITORIES,
    ...SERVICES,
    MyHttpCreateResponseBuilder
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import this module in the AppModule only.');
    }
  }
}
