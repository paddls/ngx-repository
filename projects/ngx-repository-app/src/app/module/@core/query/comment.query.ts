import {HttpParam, Query} from 'ngx-repository';

export class CommentQuery extends Query<string> {

  @HttpParam()
  public libraryId: string;

  @HttpParam()
  public bookId: string;

  public constructor(data: Partial<CommentQuery> = {}) {
    super();

    Object.assign(this, data);
  }
}
