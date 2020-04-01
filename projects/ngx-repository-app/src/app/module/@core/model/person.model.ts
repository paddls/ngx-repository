import {Identifiable} from './identifiable.model';
import {Column} from '@witty-services/repository-core';

export class Person extends Identifiable {

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
