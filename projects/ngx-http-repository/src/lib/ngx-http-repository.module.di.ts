import {InjectionToken} from '@angular/core';
import {PageBuilder} from '@witty-services/ngx-repository';

export const HTTP_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<any>> = new InjectionToken<PageBuilder<any>>('HTTP_PAGE_BUILDER_TOKEN');

export const HTTP_CREATE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('HTTP_CREATE_RESPONSE_BUILDER');
export const HTTP_FIND_ONE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('HTTP_FIND_ONE_RESPONSE_BUILDER');
