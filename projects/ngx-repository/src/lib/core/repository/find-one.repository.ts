import { Observable } from 'rxjs';

export interface FindOneRepository {

  findOne<R>(query?: any): Observable<R>;

}