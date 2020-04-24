import {ResponseBuilder} from '../item-builder/response-builder';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable()
export class HttpBodyResponseBuilder implements ResponseBuilder<HttpResponse<any>> {

  public build(response$: Observable<HttpResponse<any>>): Observable<any> {
    return response$.pipe(
      map((response: HttpResponse<any>) => response.body)
    );
  }
}
