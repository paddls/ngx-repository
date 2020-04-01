import {Identifiable} from './identifiable.model';
import {Observable} from 'rxjs';
import {Book} from './book.model';
import {BookRepository} from '../repository/book.repository';
import {Address} from './address.model';
import {Column, DateConverter, SubCollection} from '@witty-services/repository-core';

export class Library extends Identifiable {

  @Column()
  public name: string;

  @SubCollection({repository: BookRepository, params: (library: Library) => ({libraryId: library.id})})
  public books$: Observable<Book[]>;

  @Column(Address)
  public address: Address;

  @Column({field: 'test', writeOnly: true})
  public test: string;

  @Column({field: 'createdAt', customConverter: DateConverter})
  public createdAt: Date;

  public constructor() {
    super();

    this.test = 'test';
  }
}
