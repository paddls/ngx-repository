import {PageBuilder} from '@witty-services/ngx-repository';
import {HttpResponse} from '@angular/common/http';
import {HttpRepository} from './http.repository';

export interface HttpPageBuilder extends PageBuilder<HttpResponse<any>, HttpRepository<any, any>> {
}
