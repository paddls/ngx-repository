import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Library} from '../../module/@core/model/library.model';
import {LibrariesService} from '../../service/libraries.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent {

  public libraries$: Observable<Library[]>;

  public constructor(librariesService: LibrariesService) {
    this.libraries$ = librariesService.findAll();
  }
}
