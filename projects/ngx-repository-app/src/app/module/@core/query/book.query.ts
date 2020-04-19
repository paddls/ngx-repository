import {HttpParam} from '@witty-services/ngx-repository';

export class BookQuery {

  @HttpParam()
  public libraryId: string;

  public constructor(data: Partial<BookQuery> = {}) {
    Object.assign(this, data);
  }
}
