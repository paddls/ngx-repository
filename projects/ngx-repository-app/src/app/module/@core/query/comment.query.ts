import {PathParam} from '@witty-services/ngx-repository';

export class CommentQuery {

  @PathParam()
  public libraryId: string;

  @PathParam()
  public bookId: string;

  public constructor(data: Partial<CommentQuery> = {}) {
    Object.assign(this, data);
  }
}
