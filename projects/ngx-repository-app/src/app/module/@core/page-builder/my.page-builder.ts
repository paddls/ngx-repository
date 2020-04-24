import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {find} from 'lodash';
import {Page, PageBuilder} from '@witty-services/ngx-repository';

@Injectable()
export class MyPageBuilder  implements PageBuilder<HttpResponse<any>> {

  public buildPage(response$: Observable<HttpResponse<any>>): Observable<Page<any>> {
    return response$.pipe(
      map((response: HttpResponse<any>) => {
        const page: Page<any> = new Page<any>(response.body);

        if (!response.headers[`lazyUpdate`]) {
          return page;
        }

        page.totalItems = parseInt(find(response.headers[`lazyUpdate`], (obj: {name: string, value: string}) => obj.name === 'apiTotalItems').value, 10);
        page.itemsPerPage = parseInt(find(response.headers[`lazyUpdate`], (obj: {name: string, value: string}) => obj.name === 'apiPerPage').value, 10);
        page.currentPage = parseInt(find(response.headers[`lazyUpdate`], (obj: {name: string, value: string}) => obj.name === 'apiCurrentPage').value, 10);

        return page;
      })
    );
  }
}
