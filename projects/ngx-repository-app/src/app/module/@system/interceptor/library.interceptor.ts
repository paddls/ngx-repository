import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class LibraryInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url: string = req.url;
    if (url.startsWith('/library')) {
      url = url.replace('/library', '/libraries');
    }

    return next.handle(req.clone({url}));
  }
}
