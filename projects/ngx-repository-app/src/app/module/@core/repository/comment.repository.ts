import {Comment} from '../model/comment.model';
import {MyAbstractRepository} from './my-abstract.repository';
import {InjectableRepository} from 'ngx-repository';

export interface CommentRepositoryParams {
  bookId: string;
  libraryId: string;
}

@InjectableRepository({
  type: Comment,
  path: '/libraries/:libraryId/books/:bookId/comments'
})
export class CommentRepository extends MyAbstractRepository<Comment, string, CommentRepositoryParams> {
}
