import { EMPTY, Observable, of, OperatorFunction } from 'rxjs';
import { flatten } from 'lodash';
import { expand, first, map, switchMap, toArray } from 'rxjs/operators';
import { Page } from '@paddls/ngx-repository';

export function fetchAllPage<T>(fetch: (page: number) => Observable<Page<any>>): OperatorFunction<Page<T>, T[]> {
  return (source: Observable<Page<T>>): Observable<T[]> => {
    return source.pipe(
      switchMap((firstPage: Page<T>) => of(firstPage).pipe(
        expand((page: Page<T>) => {
          if (page.totalItems > page.itemsPerPage * (page.currentPage + 1) && page.itemsPerPage > 0) {
            return fetch(page.currentPage + 1).pipe(
              first()
            );
          }
          return EMPTY;
        }),
        toArray(),
        map(flatten)
      ))
    );
  };
}
