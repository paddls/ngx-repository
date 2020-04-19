import {Identifiable} from './identifiable.model';
import { Column, FirebaseResource } from '@witty-services/ngx-repository';

@FirebaseResource({
  path: '/clients'
})
export class Client extends Identifiable {

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  public constructor(data: Partial<Client> = {}) {
    super(data);

    Object.assign(this, data);
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
