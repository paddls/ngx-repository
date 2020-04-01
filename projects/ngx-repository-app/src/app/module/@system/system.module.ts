import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BaseUrlInterceptor} from './interceptor/base-url.interceptor';
import {BookInterceptor} from './interceptor/book.interceptor';
import {CommentInterceptor} from './interceptor/comment.interceptor';
import {UrlLoggerInterceptor} from './interceptor/url-logger.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlLoggerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BookInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommentInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    }
  ]
})
export class SystemModule {

  public constructor(@Optional() @SkipSelf() parentModule: SystemModule) {
    if (parentModule) {
      throw new Error('SystemModule has already been loaded. You should only import this module in the AppModule only.');
    }
  }
}
