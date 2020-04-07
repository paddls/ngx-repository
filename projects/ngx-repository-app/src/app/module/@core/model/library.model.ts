import {Identifiable} from './identifiable.model';
import {Observable} from 'rxjs';
import {Book} from './book.model';
import {Address} from './address.model';
import {Column, DateConverter, SubCollection} from '@witty-services/repository-core';
import {HttpResource, FirebaseResource} from 'ngx-repository';

@HttpResource({
  read: {
    path: '/libraries'
  }
})
@FirebaseResource({
  write: {
    path: '/library'
  }
})
export class Library extends Identifiable {

  @Column()
  public name: string;

  @SubCollection({resourceType: Book, params: (library: Library) => ({libraryId: library.id})})
  public books$: Observable<Book[]>;

  @Column(Address)
  public address: Address;

  @Column({field: 'test', writeOnly: true})
  public test: string;

  @Column({field: 'createdAt', customConverter: DateConverter})
  public createdAt: Date;

  public constructor(data: Partial<Book> = {}) {
    super(data);

    Object.assign(this, data);

    this.test = 'test';
  }
}
