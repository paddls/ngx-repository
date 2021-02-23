import { Observable } from 'rxjs';

export interface FindAllRepository {

  findAll<R>(query?: any): Observable<R>;

}