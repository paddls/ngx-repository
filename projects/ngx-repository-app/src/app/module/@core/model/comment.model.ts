import {Identifiable} from './identifiable.model';
import {Person} from './person.model';
import {Observable} from 'rxjs';
import {Column, HttpResource, JoinColumn} from 'ngx-repository';

@HttpResource({
  path: '/libraries/:libraryId/books/:bookId/comments'
})
export class Comment extends Identifiable {

  @Column()
  public message: string;

  @Column()
  public author: string;

  @Column()
  public book: string;

  @JoinColumn({attribute: 'author', resourceType: Person})
  public author$: Observable<Person>;

  public constructor(data: Partial<Comment> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
