import {Identifiable} from './identifiable.model';
import {Column, HttpResource} from '@witty-services/ngx-repository';
import {MyHttpCreateResponseBuilder} from '../response-builder/my-http-create.response-builder';

@HttpResource({
  path: '/persons',
  create: {
    path: '/persons',
    responseBuilder: MyHttpCreateResponseBuilder
  }
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
