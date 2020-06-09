import {InjectionToken} from '@angular/core';
import {PageBuilder, ResponseBuilder} from '@witty-services/ngx-repository';
import {HttpResponse} from '@angular/common/http';


/** @ignore */
export const HTTP_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<HttpResponse<any>>> = new InjectionToken<PageBuilder<HttpResponse<any>>>('HTTP_PAGE_BUILDER_TOKEN');

/** @ignore */
export const HTTP_CREATE_RESPONSE_BUILDER: InjectionToken<ResponseBuilder<HttpResponse<any>>> = new InjectionToken<ResponseBuilder<HttpResponse<any>>>('HTTP_CREATE_RESPONSE_BUILDER');

/** @ignore */
export const HTTP_FIND_ONE_RESPONSE_BUILDER: InjectionToken<ResponseBuilder<HttpResponse<any>>> = new InjectionToken<ResponseBuilder<HttpResponse<any>>>('HTTP_FIND_ONE_RESPONSE_BUILDER');
