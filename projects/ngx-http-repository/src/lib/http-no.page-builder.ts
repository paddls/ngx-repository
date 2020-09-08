import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Page} from '@witty-services/ngx-repository';
import {HttpPageBuilder} from './http-page-builder';

/**
 * @ignore
 */
@Injectable()
export class HttpNoPageBuilder implements HttpPageBuilder {

  public buildPage(response$: Observable<HttpResponse<any>>): Observable<Page<any>> {
    return response$.pipe(
      map((response: HttpResponse<any>) => new Page(response.body)),
      tap((page: Page<any>) => page.currentPage = 1),
      tap((page: Page<any>) => page.itemsPerPage = page.length),
      tap((page: Page<any>) => page.totalItems = page.length)
    );
  }
}
