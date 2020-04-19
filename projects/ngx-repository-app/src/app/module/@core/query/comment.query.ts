import {HttpParam} from '@witty-services/ngx-repository';

export class CommentQuery {

  @HttpParam()
  public libraryId: string;

  @HttpParam()
  public bookId: string;

  public constructor(data: Partial<CommentQuery> = {}) {
    Object.assign(this, data);
  }
}
