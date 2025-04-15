import { Injectable } from '@angular/core';
import { HttpRepository } from '@paddls/ngx-http-repository';
import { Book } from '../model/book.model';
import { Page, injectRepository } from '@paddls/ngx-repository';
import { Observable } from 'rxjs';
import { Chance } from 'chance';
import { BookQuery } from '../query/book.query';

@Injectable()
export class BookService {

  private bookRepository: HttpRepository<Book, string> = injectRepository({
    resourceType: () => Book,
    repository: () => HttpRepository
  });

  private chance: Chance.Chance = new Chance.Chance();

  public books$: Observable<Page<Book>>;

  public constructor() {
    this.books$ = this.bookRepository.findAll();
  }

  public update(book: Book): Observable<void> {
    book.title = this.chance.name();

    return this.bookRepository.update(book);
  }

  public findById(id: string, query: BookQuery): Observable<Book> {
    return this.bookRepository.findById(id, query);
  }
}
