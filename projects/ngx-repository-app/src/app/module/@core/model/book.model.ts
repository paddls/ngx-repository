import {Person} from './person.model';
import {Comment} from './comment.model';
import {Observable} from 'rxjs';
import {Identifiable} from './identifiable.model';
import {Column, JoinColumn, SubCollection} from '@witty-services/repository-core';
import {PersonRepository} from '../repository/person.repository';
import {CommentRepository} from '../repository/comment.repository';

export class Book extends Identifiable {

  @Column('title')
  public title: string;

  @Column({field: 'author'})
  public authorId: string;

  @Column({field: 'editor.id'})
  public editorId: string;

  @Column()
  public library: string;

  @JoinColumn({field: 'authorId', repository: PersonRepository})
  public author$: Observable<Person>;

  @JoinColumn({field: 'editorId', repository: PersonRepository})
  public editor$: Observable<Person>;

  @SubCollection({
    repository: CommentRepository,
    params: (book: Book, params: any) => ({bookId: book.id, libraryId: params.libraryId})
  })
  public comments$: Observable<Comment[]>;
}
