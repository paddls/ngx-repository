import {HttpNoPageBuilder} from './http-no.page-builder';
import {of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Page} from '@witty-services/ngx-repository';

describe('HttpNoPageBuilder', () => {

  it('should return a simple page without any informations of page', (done: DoneFn) => {
    const builder: HttpNoPageBuilder = new HttpNoPageBuilder();

    builder.buildPage(of({body: [1, 2, 3]} as HttpResponse<any>)).subscribe({
      next: (page: Page<any>) => {
        const pageExpected: Page<any> = new Page<any>([1, 2, 3]);
        pageExpected.currentPage = 1;
        pageExpected.itemsPerPage = 3;
        pageExpected.totalItems = 3;
        expect(page).toEqual(pageExpected);
      },
      complete: () => done()
    });
  });
});
