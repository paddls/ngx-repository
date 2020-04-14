import {HttpParam, Query} from 'ngx-repository';

export class BookQuery extends Query<string> {

  @HttpParam()
  public libraryId: string;

  public constructor(data: Partial<BookQuery> = {}) {
    super();

    Object.assign(this, data);
  }
}
