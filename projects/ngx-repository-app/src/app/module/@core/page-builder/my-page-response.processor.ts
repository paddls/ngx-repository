import { Injectable } from '@angular/core';
import { Page, RequestManagerContext } from '@witty-services/ngx-repository';
import { HttpRepositoryResponse } from '@witty-services/ngx-http-repository';
import { ResponseProcessor } from '../../../../../../ngx-repository/src/lib/core/response/transformer/response.processor';

@Injectable()
export class MyPageResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: HttpRepositoryResponse, context: RequestManagerContext): any {
    const totalItems: number = parseInt(origin.getHeaders().get('apiTotalItems'), 10);
    const itemsPerPage: number = parseInt(origin.getHeaders().get('apiPerPage'), 10);
    const currentPage: number = parseInt(origin.getHeaders().get('apiCurrentPage'), 10);

    return Page.build(response, currentPage, itemsPerPage, totalItems);
  }
}
