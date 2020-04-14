import {HttpHeader, HttpQueryParam, Query} from 'ngx-repository';

export class LibraryQuery extends Query<string> {

  @HttpQueryParam()
  public opened: boolean;

  @HttpHeader('apiPaginated')
  public paginated: boolean = true;

  @HttpHeader({name: 'apiCurrentPage'})
  public page: number = 1;

  @HttpHeader('apiPerPage')
  public itemPerPage: number = 2;

  public constructor(data: Partial<LibraryQuery> = {}) {
    super();

    Object.assign(this, data);
  }
}
