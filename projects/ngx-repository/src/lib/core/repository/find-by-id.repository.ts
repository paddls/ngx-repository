import { Observable } from 'rxjs';

export interface FindByIdRepository {

  findById<R, K>(id: K, query?: any): Observable<R>;

}
