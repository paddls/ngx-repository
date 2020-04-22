import {Request} from '../query-builder/request';

export interface Driver<RS> {

  findBy(request: Request): RS;

  findOne(request: Request): RS;

  delete(request: Request): RS;

  create(object: any, request: Request): RS;

  update(object: any, request: Request): RS;
}
