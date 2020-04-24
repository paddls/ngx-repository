import {HttpHeader, HttpQueryParam} from '@witty-services/ngx-http-repository';

export class LibraryQuery {

  @HttpQueryParam()
  public opened: boolean;

  @HttpHeader('apiPaginated')
  public paginated: boolean = true;

  @HttpHeader({name: 'apiCurrentPage'})
  public page: number = 1;

  @HttpHeader('apiPerPage')
  public itemPerPage: number = 2;

  public constructor(data: Partial<LibraryQuery> = {}) {
    Object.assign(this, data);
  }
}
