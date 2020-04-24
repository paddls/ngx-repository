import {Request} from '../query-builder/request';
import {Observable} from 'rxjs';

export interface Driver<RS> {

  findBy(request: Request): Observable<RS>;

  findOne(request: Request): Observable<RS>;

  delete(request: Request): Observable<RS>;

  create(object: any, request: Request): Observable<RS>;

  update(object: any, request: Request): Observable<RS>;
}
