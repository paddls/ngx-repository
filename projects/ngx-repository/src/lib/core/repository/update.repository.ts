import { Observable } from 'rxjs';

export interface UpdateRepository {

  update<T, R>(object: T, query?: any): Observable<R>;

}
