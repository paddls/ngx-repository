import {Person} from './person.model';
import {Comment} from './comment.model';
import {Observable} from 'rxjs';
import {Identifiable} from './identifiable.model';
import {Column, JoinColumn, SubCollection} from '@witty-services/repository-core';
import {HttpResource} from 'ngx-repository';

@HttpResource({
  path: '/libraries/:libraryId/books'
})
export class Book extends Identifiable {

  @Column('title')
  public title: string;

  @Column({field: 'author'})
  public authorId: string;

  @Column({field: 'editor.id'})
  public editorId: string;

  @Column()
  public library: string;

  @JoinColumn({field: 'authorId', resourceType: Person})
  public author$: Observable<Person>;

  @JoinColumn({field: 'editorId', resourceType: Person})
  public editor$: Observable<Person>;

  @SubCollection({
    resourceType: Comment,
    params: (book: Book, params: any) => ({bookId: book.id, libraryId: params.libraryId})
  })
  public comments$: Observable<Comment[]>;

  public constructor(data: Partial<Book> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
