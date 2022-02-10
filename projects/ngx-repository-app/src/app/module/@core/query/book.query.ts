import {PathParam} from '@paddls/ngx-repository';
import {HttpQueryParam} from '@paddls/ngx-http-repository';

export class BookQuery {

  @PathParam('libraryId')
  public LIBRARY_ID: string;

  @HttpQueryParam()
  public search: string;

  public constructor(data: Partial<BookQuery> = {}) {
    Object.assign(this, data);
  }
}
