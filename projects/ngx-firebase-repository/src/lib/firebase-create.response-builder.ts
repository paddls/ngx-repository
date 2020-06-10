import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {FirebaseResponseBuilder} from './firebase-response-builder';

/**
 * @ignore
 */
@Injectable()
export class FirebaseCreateResponseBuilder implements FirebaseResponseBuilder {

  public build(response$: Observable<{ id: any }>): Observable<any> {
    return response$.pipe(
      map((documentReference: { id: any }) => documentReference.id)
    );
  }
}
