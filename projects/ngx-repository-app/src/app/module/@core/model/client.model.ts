import {Identifiable} from './identifiable.model';
import {Column, FirebaseResource, Page, SubCollection} from '@witty-services/ngx-repository';
import {Observable} from 'rxjs';
import {Purchase} from './purchase.model';
import {PurchaseQuery} from '../query/purchase.query';

@FirebaseResource({
  path: '/clients'
})
export class Client extends Identifiable {

  @Column()
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @SubCollection({resourceType: Purchase, params: (client: Client) => new PurchaseQuery({clientId: client.id})})
  public purchases$: Observable<Page<Purchase>>;

  public constructor(data: Partial<Client> = {}) {
    super(data);

    Object.assign(this, data);
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
