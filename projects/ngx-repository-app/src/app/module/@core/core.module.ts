import {NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {LibraryService} from './service/library.service';
import {ReadPersonRepository} from './repository/person.repository';
import {PersonService} from './service/person.service';

const REPOSITORIES: Provider[] = [
  ReadPersonRepository
];

const SERVICES: Provider[] = [
  LibraryService,
  PersonService
];

@NgModule({
  providers: [
    ...REPOSITORIES,
    ...SERVICES
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import this module in the AppModule only.');
    }
  }
}
