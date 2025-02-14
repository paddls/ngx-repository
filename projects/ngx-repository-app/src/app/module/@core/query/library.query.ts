import { HttpHeader, HttpQueryParam } from '@paddls/ngx-http-repository';

export class LibraryQuery {

  @HttpQueryParam('id')
  public libraryId: string;

  @HttpQueryParam()
  public opened: boolean;

  @HttpHeader('apiPaginated')
  public paginated: boolean = true;

  @HttpHeader({ name: 'apiCurrentPage' })
  public page: number = 1;

  @HttpHeader('apiPerPage')
  public itemPerPage: number = 2;

  public constructor(data: Partial<LibraryQuery> = {}) {
    Object.assign(this, data);
  }
}
