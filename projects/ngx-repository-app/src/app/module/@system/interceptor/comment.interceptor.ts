import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class CommentInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlFragments: string[] = req.url.split('/');

    if ((urlFragments.length === 6 || urlFragments.length === 7) && urlFragments[5] === 'comments' && req.method === 'GET') {
      req = req.clone(
        {
          url: `/comments/${urlFragments.length === 7 ? urlFragments[6] : `?book=${urlFragments[4]}`}`
        }
      );
    }

    return next.handle(req);
  }
}
