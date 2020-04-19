import { Identifiable } from './identifiable.model';
import { Column, FirebaseResource, JoinColumn } from '@witty-services/ngx-repository';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@FirebaseResource({
  path: '/clients/:clientId/purchases'
})
export class Purchase extends Identifiable {

  @Column()
  public bookId: string;

  // TODO @RMA / TNI cross repository
  @JoinColumn({attribute: 'bookId', resourceType: Book})
  public book$: Observable<Book>;

  public constructor(data: Partial<Purchase> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
