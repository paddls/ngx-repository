import { Person } from './person.model';
import { Comment } from './comment.model';
import { Observable } from 'rxjs';
import { Identifiable } from './identifiable.model';
import { CommentQuery } from '../query/comment.query';
import { Column, JoinColumn, PathColumn, SubCollection } from '@paddls/ngx-repository';
import { HttpRepository, HttpResource } from '@paddls/ngx-http-repository';
import { Library } from './library.model';
import { PersonRepository } from '../repository/person.repository';

@HttpResource({
  path: '/libraries/:libraryId/books'
})
export class Book extends Identifiable {

  @Column('title')
  public title: string;

  @Column({ field: 'author' })
  public authorId: string;

  @Column({ field: 'editor.id' })
  public editorId: string;

  @PathColumn('libraryId')
  public LIBRARYID: string;

  @Column()
  public library: string;

  @JoinColumn({ attribute: 'LIBRARYID', resourceType: () => Library, repository: () => HttpRepository })
  public library$: Observable<Library>;

  @JoinColumn({ attribute: 'authorId', resourceType: () => Person, repository: () => PersonRepository })
  public author$: Observable<Person>;

  @JoinColumn({ attribute: 'editorId', resourceType: () => Person, repository: () => HttpRepository })
  public editor$: Observable<Person>;

  @SubCollection({
    resourceType: () => Comment,
    params: (book: Book, params: any) => new CommentQuery({ bookId: book.id, libraryId: params.LIBRARY_ID }),
    repository: () => HttpRepository
  })
  public comments$: Observable<Comment[]>;

  public constructor(data: Partial<Book> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
