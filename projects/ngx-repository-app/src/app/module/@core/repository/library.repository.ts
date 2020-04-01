import {Library} from '../model/library.model';
import {MyAbstractRepository} from './my-abstract.repository';
import {InjectableRepository} from 'ngx-repository';

@InjectableRepository({
  type: Library,
  path: '/libraries'
})
export class LibraryRepository extends MyAbstractRepository<Library, string>  {}
