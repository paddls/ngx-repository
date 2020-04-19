import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirebaseConnection, FirebaseRepository, InjectRepository, Page } from '@witty-services/ngx-repository';
import { Client } from '../model/client.model';
import { Chance } from 'chance';
import { Purchase } from '../model/purchase.model';
import { PurchaseQuery } from '../query/purchase.query';

@Injectable()
export class ClientService {

  @InjectRepository({type: Client, connection: FirebaseConnection})
  private repository: FirebaseRepository<Client, string>;

  @InjectRepository({type: Purchase, connection: FirebaseConnection})
  private purchaseRepository: FirebaseRepository<Purchase, string>;

  private chance: Chance.Chance = new Chance.Chance();

  public findAll(): Observable<Page<Client>> {
    return this.repository.findBy();
  }

  public create(): Observable<Client> {
    return this.repository.create(new Client({
      firstName: this.chance.first(),
      lastName: this.chance.last()
    }));
  }

  public addPurchase(client: Client): Observable<void> {
    return this.purchaseRepository.create(new Purchase({
      bookId: `${this.chance.integer({
        min: 1,
        max: 3
      })}`,
    }), new PurchaseQuery({
      clientId: client.id
    }));
  }

  public findById(id: string): Observable<Client> {
    return this.repository.findOne(id);
  }

  public delete(client: Client): Observable<void> {
    return this.repository.delete(client);
  }

  public update(client: Client): Observable<Client> {
    const clientToUpdate: Client = new Client(client);

    clientToUpdate.firstName = this.chance.last();

    return this.repository.update(clientToUpdate);
  }
}
