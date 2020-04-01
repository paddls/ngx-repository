import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class BookInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlFragments: string[] = req.url.split('/');

    if ((urlFragments.length === 4 || urlFragments.length === 5) && urlFragments[3] === 'books' && req.method === 'GET') {
      req = req.clone(
        {
          url: `/books/${urlFragments.length === 5 ? urlFragments[4] : `?library=${urlFragments[2]}`}`
        }
      );
    }

    return next.handle(req);
  }
}
