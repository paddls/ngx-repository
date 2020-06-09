import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
    );
  }
}
