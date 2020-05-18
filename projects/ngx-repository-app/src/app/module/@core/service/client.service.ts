import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {InjectRepository, Page} from '@witty-services/ngx-repository';
import {Client} from '../model/client.model';
import {Chance} from 'chance';
import {Purchase} from '../model/purchase.model';
import {PurchaseQuery} from '../query/purchase.query';
import {ClientQuery} from '../query/client.query';
import {FirebaseRepository} from '@witty-services/ngx-firebase-repository';

@Injectable()
export class ClientService {

  @InjectRepository({resourceType: () => Client, repository: () => FirebaseRepository})
  private repository: FirebaseRepository<Client, string>;

  @InjectRepository({resourceType: () => Purchase, repository: () => FirebaseRepository})
  private purchaseRepository: FirebaseRepository<Purchase, string>;

  private chance: Chance.Chance = new Chance.Chance();

  public searchByLastName(searchedLastName: string): Observable<Page<Client>> {
    return this.repository.findAll(new ClientQuery({
      lastNameEqual: searchedLastName,
      orderBy: ['firstName']
    }));
  }

  public create(): Observable<string> {
    return this.repository.create(new Client({
      firstName: this.chance.first(),
      lastName: this.chance.last()
    }));
  }

  public addPurchase(client: Client): Observable<string> {
    return this.purchaseRepository.create(
      new Purchase({
        bookId: `${this.chance.integer({
          min: 1,
          max: 3
        })}`,
      }),
      new PurchaseQuery({
      clientId: client.id
      })
    );
  }

  public findById(id: string): Observable<Client> {
    return this.repository.findOne(id);
  }

  public delete(client: Client): Observable<void> {
    return this.repository.delete(client);
  }

  public update(client: Client): Observable<void> {
    const clientToUpdate: Client = new Client(client);

    clientToUpdate.firstName = this.chance.last();

    return this.repository.update(clientToUpdate);
  }
}
