export interface Driver<RQ, RS> {

  findBy(query: RQ): RS;

  findOne(query: RQ): RS;

  delete(query: RQ): RS;

  create(object: any, query: RQ): RS;

  update(object: any, query: RQ): RS;
}
