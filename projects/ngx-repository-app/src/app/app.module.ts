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
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
import {MyPageBuilder} from './module/@core/page-builder/my.page-builder';
import {ClientComponent} from './component/client/client.component';
import {MyHttpCreateResponseBuilder} from './module/@core/response-builder/my-http-create.response-builder';
import {HTTP_CREATE_RESPONSE_BUILDER, HTTP_PAGE_BUILDER_TOKEN, NgxHttpRepositoryModule} from '@witty-services/ngx-http-repository';
import {FIREBASE_APP, NgxFirebaseRepositoryModule} from '@witty-services/ngx-firebase-repository';
import * as firebase from 'firebase';
import App = firebase.app.App;

export function createFirebaseApp(): App {
  return firebase.initializeApp({
    apiKey: 'AIzaSyDSd6EXdQWaWcBMxbTYp-kFAV3zxNu-ArM',
    authDomain: 'ngx-repository.firebaseapp.com',
    databaseURL: 'https://ngx-repository.firebaseio.com',
    projectId: 'ngx-repository',
    storageBucket: 'ngx-repository.appspot.com',
    messagingSenderId: '352664344689',
    appId: '1:352664344689:web:20ec56387616cba621e3d0',
    measurementId: 'G-0RD9MTX3PB'
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LibrariesComponent,
    LibraryComponent,
    ClientComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 100}),
    NgxRepositoryModule.forRoot(),
    NgxFirebaseRepositoryModule.forRoot(),
    NgxHttpRepositoryModule,
    SystemModule
  ],
  providers: [
    LibrariesService,
    {
      provide: HTTP_PAGE_BUILDER_TOKEN,
      useClass: MyPageBuilder
    },
    {
      provide: HTTP_CREATE_RESPONSE_BUILDER,
      useClass: MyHttpCreateResponseBuilder
    },
    {
      provide: FIREBASE_APP,
      useFactory: createFirebaseApp
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

