import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom, NgModule } from '@angular/core';
import { AppComponent } from './component/app/app.component';
import { CoreModule } from './module/@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';
import { SystemModule } from './module/@system/system.module';
import { LibrariesComponent } from './component/libraries/libraries.component';
import { LibraryComponent } from './component/library/library.component';
import { provideNgxRepository } from '@paddls/ngx-repository';
import { MyPageResponseProcessor } from './module/@core/processor/my-page-response.processor';
import { ClientComponent } from './component/client/client.component';
import { FIRESTORE_APP, provideNgxFirestoreRepository } from '@paddls/ngx-firestore-repository';
import { initializeApp } from 'firebase/app';
import { BookService } from './module/@core/service/book.service';
import { Firestore, getFirestore } from 'firebase/firestore';
import { PersonComponent } from './component/person/person.component';
import { provideNgxHttpRepository } from '@paddls/ngx-http-repository';

export const createFirestore: () => Firestore = () => getFirestore(initializeApp({
  apiKey: 'AIzaSyDSd6EXdQWaWcBMxbTYp-kFAV3zxNu-ArM',
  authDomain: 'ngx-repository.firebaseapp.com',
  databaseURL: 'https://ngx-repository.firebaseio.com',
  projectId: 'ngx-repository',
  storageBucket: 'ngx-repository.appspot.com',
  messagingSenderId: '352664344689',
  appId: '1:352664344689:web:20ec56387616cba621e3d0',
  measurementId: 'G-0RD9MTX3PB'
}));

@NgModule({
  declarations: [
    AppComponent,
    LibrariesComponent,
    LibraryComponent,
    ClientComponent,
    PersonComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    SystemModule,
  ],
  providers: [
    provideNgxRepository({
      normalizerConfiguration: {
        denormalizeNull: true,
        normalizeNull: false,
        denormalizeUndefined: true,
        normalizeUndefined: false
      }
    }),
    provideNgxFirestoreRepository({
      debug: true
    }),
    provideNgxHttpRepository({
      debug: true
    }),
    MyPageResponseProcessor,
    BookService,
    {
      provide: FIRESTORE_APP,
      useFactory: createFirestore
    },
    importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 100}))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

