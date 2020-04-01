import {Identifiable} from './identifiable.model';
import {Person} from './person.model';
import {Observable} from 'rxjs';
import {PersonRepository} from '../repository/person.repository';
import {Column, JoinColumn} from '@witty-services/repository-core';

export class Comment extends Identifiable {

  @Column()
  public message: string;

  @Column()
  public author: string;

  @Column()
  public book: string;

  @JoinColumn({field: 'author', repository: PersonRepository})
  public author$: Observable<Person>;
}
