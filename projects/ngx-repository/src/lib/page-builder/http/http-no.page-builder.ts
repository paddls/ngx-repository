import {PageBuilder} from '../page-builder';
import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page} from '../page';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class HttpNoPageBuilder implements PageBuilder<Observable<HttpResponse<any>>> {

  public buildPage(response$: Observable<HttpResponse<any>>): Observable<Page<any>> {
    return response$.pipe(
      map((response: HttpResponse<any>) => new Page(response.body)),
    );
  }
}
