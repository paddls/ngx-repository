import { inject, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './interceptor/base-url.interceptor';
import { BookInterceptor } from './interceptor/book.interceptor';
import { CommentInterceptor } from './interceptor/comment.interceptor';
import { LibraryInterceptor } from './interceptor/library.interceptor';
import { PatchInterceptor } from './interceptor/patch.interceptor';
import { RemoveIdInterceptor } from './interceptor/remove-id.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PatchInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LibraryInterceptor,
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RemoveIdInterceptor,
      multi: true
    }
  ]
})
export class SystemModule {

  public constructor() {
    const parentModule: SystemModule = inject(SystemModule, { optional: true, skipSelf: true });

    if (parentModule) {
      throw new Error('SystemModule has already been loaded. You should only import this module in the AppModule only.');
    }
  }
}
