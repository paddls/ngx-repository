import { Observable } from 'rxjs';

export interface DeleteRepository {

  delete<T, R>(object: T, query?: any): Observable<R>;

}