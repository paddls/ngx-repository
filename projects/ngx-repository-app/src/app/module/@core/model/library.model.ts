import {Identifiable} from './identifiable.model';
import {Observable} from 'rxjs';
import {Book} from './book.model';
import {Address} from './address.model';
import {BookQuery} from '../query/book.query';
import {Column, DateConverter, Page, SubCollection} from '@witty-services/ngx-repository';
import {HttpRepository, HttpResource} from '@witty-services/ngx-http-repository';

@HttpResource({
  path: '/libraries',
  update: '/library'
})
export class Library extends Identifiable {

  @Column()
  public name: string;

  @Column(() => Address)
  public address: Address;

  @Column({field: 'test', writeOnly: true})
  public test: string;

  @Column()
  public opened: boolean;

  @Column({field: 'createdAt', customConverter: () => DateConverter})
  public createdAt: Date;

  @SubCollection({
    resourceType: () => Book,
    params: (library: Library) => new BookQuery({libraryId: library.id}),
    repository: () => HttpRepository
  })
  public books$: Observable<Page<Book>>;

  public constructor(data: Partial<Library> = {}) {
    super(data);

    Object.assign(this, data);

    this.test = 'test';
  }

  public get identity(): string {
    return `${this.id} - ${this.name}`;
  }
}
