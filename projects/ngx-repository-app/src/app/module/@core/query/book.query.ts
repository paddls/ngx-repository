import {PathParam} from '@witty-services/ngx-repository';

export class BookQuery {

  @PathParam()
  public libraryId: string;

  public constructor(data: Partial<BookQuery> = {}) {
    Object.assign(this, data);
  }
}
