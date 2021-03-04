import { Observable } from 'rxjs';

export interface PatchRepository {

  patch<T, R>(object: T, query?: any): Observable<R>;

}
