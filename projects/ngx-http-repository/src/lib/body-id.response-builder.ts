import {AbstractRepository} from '@witty-services/ngx-repository';
import {HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponseBuilder} from './http-response-builder';

/**
 * @ignore
 */
@Injectable()
export class BodyIdResponseBuilder implements HttpResponseBuilder {

  public build(response$: Observable<HttpResponse<any>>, repository: AbstractRepository<any, any, any, any>): Observable<any> {
    return response$.pipe(
      map((response: HttpResponse<any>) => response.body[repository.getIdContext().field])
    );
  }
}
