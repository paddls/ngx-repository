import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './component/app/app.component';
import {CoreModule} from './module/@core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service/in-memory-data.service';
import {SystemModule} from './module/@system/system.module';
import {LibrariesComponent} from './component/libraries/libraries.component';
import {LibraryComponent} from './component/library/library.component';
import {LibrariesService} from './service/libraries.service';
import {HTTP_PAGE_BUILDER_TOKEN, NgxRepositoryModule} from '@witty-services/ngx-repository';
import {MyPageBuilder} from './module/@core/page-builder/my.page-builder';
import { NgxFirebaseRepositoryModule } from '@witty-services/ngx-repository';

@NgModule({
  declarations: [
    AppComponent,
    LibrariesComponent,
    LibraryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 100}),
    NgxRepositoryModule.forRoot(),
    NgxFirebaseRepositoryModule.forRoot(),
    SystemModule
  ],
  providers: [
    LibrariesService,
    {
      provide: HTTP_PAGE_BUILDER_TOKEN,
      useClass: MyPageBuilder
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

