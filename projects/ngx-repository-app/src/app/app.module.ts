import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './component/app/app.component';
import {CoreModule} from './module/@core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service/in-memory-data.service';
import {NgxRepositoryModule} from 'ngx-repository';
import {SystemModule} from './module/@system/system.module';
import {LibrariesComponent} from './component/libraries/libraries.component';
import {LibraryComponent} from './component/library/library.component';
import {LibrariesService} from './service/libraries.service';

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
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgxRepositoryModule.forRoot(),
    SystemModule
  ],
  providers: [
    LibrariesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
