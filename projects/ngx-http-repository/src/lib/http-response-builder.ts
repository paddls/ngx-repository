import {ResponseBuilder} from '@witty-services/ngx-repository';
import {HttpResponse} from '@angular/common/http';

export interface HttpResponseBuilder extends ResponseBuilder<HttpResponse<any>> {
}
