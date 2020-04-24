import {Identifiable} from './identifiable.model';
import {Column} from '@witty-services/ngx-repository';
import {HttpResource} from '@witty-services/ngx-http-repository';

@HttpResource({
  path: '/persons'
})
export class Person extends Identifiable {

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  public constructor(data: Partial<Person> = {}) {
    super(data);

    Object.assign(this, data);
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
