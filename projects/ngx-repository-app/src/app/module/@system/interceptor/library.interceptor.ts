import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class LibraryInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let url: string = req.url;
    if (url.startsWith('/library')) {
      url = url.replace('/library', '/libraries');
    }

    req = req.clone({ url });
    if (!req.headers || !req.headers.has('apiPaginated') || !req.headers.get('apiPaginated')) {
      return next.handle(req);
    }

    const pageLength: number = parseInt(req.headers.get('apiPerPage'), 10) * (parseInt(req.headers.get('apiCurrentPage'), 10) - 1);

    return next.handle(req).pipe(
      map((response: HttpResponse<any[]>) => {
        if (!Array.isArray(response.body)) {
          return response;
        } else {
          return response.clone({
            body: response.body.slice(pageLength, pageLength + parseInt(req.headers.get('apiPerPage'), 10)),
            headers: response.headers
              .append('apiTotalItems', '6')
              .append('apiPerPage', req.headers.get('apiPerPage'))
              .append('apiCurrentPage', req.headers.get('apiCurrentPage'))
          });
        }
      })
    );
  }
}
