import {Book} from '../model/book.model';
import {MyAbstractRepository} from './my-abstract.repository';
import {InjectableRepository} from 'ngx-repository';

export interface BookRepositoryParams {
  libraryId: string;
}

@InjectableRepository({
  type: Book,
  path: '/libraries/:libraryId/books',
  write: {
    path: '/books'
  }
})
export class BookRepository extends MyAbstractRepository<Book, string, BookRepositoryParams>  {
}
