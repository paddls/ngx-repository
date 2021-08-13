import { Observable } from 'rxjs';

export interface CreateRepository {

  create<T, R>(object: T, query?: any): Observable<R>;

}
