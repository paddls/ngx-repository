import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {forEach} from 'lodash';
import {tap} from 'rxjs/operators';

@Injectable()
export class UrlLoggerInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: string = '';

    if (!!req.headers) {
      forEach(req.headers.keys(), (key: string) => {
        headers += `${key}:${req.headers.get(key)}|`;
      });

      headers = headers.substr(0, headers.length - 1);
    }

    console.log('%cREQUEST%c  [' + req.method + '] ' + req.urlWithParams + ' ' + headers, 'color:red', 'color:black');

    return next.handle(req).pipe(
      tap(() => console.log('%cRESPONSE%c [' + req.method + '] ' + req.urlWithParams + ' ' + headers, 'color:green', 'color:black'))
    );
  }
}
