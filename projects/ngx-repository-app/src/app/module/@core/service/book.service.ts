import {Injectable} from '@angular/core';
import {HttpRepository} from '@witty-services/ngx-http-repository';
import {Book} from '../model/book.model';
import {InjectRepository} from '@witty-services/ngx-repository';
import {Observable} from 'rxjs';
import {Chance} from 'chance';

@Injectable()
export class BookService {

  @InjectRepository({resourceType: () => Book, repository: () => HttpRepository})
  private bookRepository: HttpRepository<Book, string>;

  private chance: Chance.Chance = new Chance.Chance();

  public update(book: Book): Observable<void> {
    book.title = this.chance.name();

    return this.bookRepository.update(book);
  }
}
