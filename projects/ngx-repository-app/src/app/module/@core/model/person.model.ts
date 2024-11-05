import { Identifiable } from './identifiable.model';
import { HttpLiveResource, HttpResource } from '@paddls/ngx-http-repository';
import { Column } from '@paddls/ngx-repository';

@HttpLiveResource()
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
