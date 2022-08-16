import { Observable, of } from 'rxjs';
import { Page } from '../core/model/page';
import { fetchAllPage } from './fetch-all-page.operator';

describe('fetchAllPage', () => {

  it('should return 2 pages', (done: DoneFn) => {
    const page1$: Observable<Page> = of(Page.build(['a', 'b'], 0, 2, 3));
    const page2$: Observable<Page> = of(Page.build(['c'], 1, 2, 3));

    page1$.pipe(
      fetchAllPage((page: number) => {
        expect(page).toEqual(1);
        return page2$;
      })
    ).subscribe((result: any[]) => {
      expect(result).toEqual(['a', 'b', 'c']);
      done();
    });
  });
});
