import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Client } from '../../module/@core/model/client.model';
import { ClientService } from '../../module/@core/service/client.service';

@Component({
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  public client$: Observable<Client>;

  public constructor(activatedRoute: ActivatedRoute,
                     private clientService: ClientService) {
    this.client$ = activatedRoute.params.pipe(
      filter((params: Params) => !!params),
      map((params: Params) => params[`clientId`]),
      switchMap((clientId: string) => this.clientService.findById(clientId))
    );
  }

  public addPurchase(client: Client): void {
    this.clientService.addPurchase(client).subscribe();
  }
}
