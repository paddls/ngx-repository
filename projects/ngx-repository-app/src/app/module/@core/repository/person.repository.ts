import {Person} from '../model/person.model';
import {MyAbstractRepository} from './my-abstract.repository';
import {InjectableRepository} from 'ngx-repository';

@InjectableRepository({
  type: Person,
  path: '/persons'
})
export class PersonRepository extends MyAbstractRepository<Person, string>  {}
