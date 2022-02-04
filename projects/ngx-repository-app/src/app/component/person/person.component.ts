import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Person } from '../../module/@core/model/person.model';
import { PersonService } from '../../module/@core/service/person.service';

@Component({
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {

  public person$: Observable<Person>;

  public constructor(activatedRoute: ActivatedRoute,
                     private personService: PersonService) {
    this.person$ = activatedRoute.params.pipe(
      filter((params: Params) => !!params),
      map((params: Params) => params[`personId`]),
      switchMap((personId: string) => this.personService.findOneById(personId))
    );
  }
}
