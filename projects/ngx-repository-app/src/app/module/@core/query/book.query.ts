import {PathParam} from '@witty-services/ngx-repository';

export class BookQuery {

  @PathParam('libraryId')
  public LIBRARY_ID: string;

  public constructor(data: Partial<BookQuery> = {}) {
    Object.assign(this, data);
  }
}
