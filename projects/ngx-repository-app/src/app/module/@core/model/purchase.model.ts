import {Identifiable} from './identifiable.model';
import {Column, JoinColumn} from '@witty-services/ngx-repository';
import {EMPTY, Observable} from 'rxjs';
import {Book} from './book.model';
import {FirebaseResource} from '@witty-services/ngx-firebase-repository';
import {HttpRepository} from '@witty-services/ngx-http-repository';

@FirebaseResource({
  path: '/clients/:clientId/purchases'
})
export class Purchase extends Identifiable {

  @Column()
  public bookId: string;

  @JoinColumn({attribute: 'bookId', resourceType: () => Book, repository: () => HttpRepository})
  public book$: Observable<Book> = EMPTY;

  public constructor(data: Partial<Purchase> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
