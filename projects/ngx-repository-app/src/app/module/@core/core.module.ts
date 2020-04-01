import {NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {PersonRepository} from './repository/person.repository';
import {LibraryRepository} from './repository/library.repository';
import {CommentRepository} from './repository/comment.repository';
import {BookRepository} from './repository/book.repository';
import {LibraryService} from './service/library.service';

const REPOSITORIES: Provider[] = [
  BookRepository,
  CommentRepository,
  LibraryRepository,
  PersonRepository
];

const SERVICES: Provider[] = [
  LibraryService
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
