import {Identifiable} from './identifiable.model';
import {Page, SubCollection, Column} from '@witty-services/ngx-repository';
import {Observable} from 'rxjs';
import {Purchase} from './purchase.model';
import {PurchaseQuery} from '../query/purchase.query';
import {FirebaseCreatedAt, FirebaseRepository, FirebaseResource, FirebaseUpdatedAt} from '@witty-services/ngx-firebase-repository';

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

  @SubCollection({
    resourceType: () => Purchase,
    params: (client: Client) => new PurchaseQuery({clientId: client.id}),
    repository: () => FirebaseRepository
  })
  public purchases$: Observable<Page<Purchase>>;

  @FirebaseCreatedAt()
  public createdAt: Date;

  @FirebaseUpdatedAt()
  public updatedAt: Date;

  public constructor(data: Partial<Client> = {}) {
    super(data);

    Object.assign(this, data);
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
