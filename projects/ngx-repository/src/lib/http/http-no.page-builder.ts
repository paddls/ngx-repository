import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PageBuilder} from '../page-builder/page-builder';
import {Page} from '../page-builder/page';

@Injectable()
export class HttpNoPageBuilder implements PageBuilder<HttpResponse<any>> {

  public buildPage(response$: Observable<HttpResponse<any>>): Observable<Page<any>> {
    return response$.pipe(
      map((response: HttpResponse<any>) => new Page(response.body)),
    );
  }
}
