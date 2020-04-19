import {Identifiable} from './identifiable.model';
import { Column, FirebaseResource } from '@witty-services/ngx-repository';

@FirebaseResource({
  path: '/clients/:clientId/purchases'
})
export class Purchase extends Identifiable {

  @Column()
  public price: number;

  public constructor(data: Partial<Purchase> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
