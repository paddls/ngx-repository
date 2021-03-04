import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PatchInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'PATCH') {
      return of(new HttpResponse({
        body: req.body,
        url: req.url
      }));
    }

    return next.handle(req);
  }
}
