import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageBuilder } from '../../page-builder/page-builder';
import { Page } from '../../page-builder/page';

@Injectable()
export class FirebaseNoPageBuilder implements PageBuilder<Observable<any>> {

  public buildPage(response$: Observable<any>): Observable<Page<any>> {
    return response$;
  }
}
