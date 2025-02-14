import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { MyPageResponseProcessor } from './app/module/@core/processor/my-page-response.processor';
import { FIRESTORE_APP, NgxFirestoreRepositoryModule } from '@paddls/ngx-firestore-repository';
import { Firestore, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { routes } from './app/app.routes';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './app/module/@core/core.module';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/service/in-memory-data.service';
import { NgxHttpRepositoryModule } from '@paddls/ngx-http-repository';
import { SystemModule } from './app/module/@system/system.module';
import { AppComponent } from './app/component/app/app.component';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideNgxRepository } from '@paddls/ngx-repository';

const createFirestore: () => Firestore = () => getFirestore(initializeApp({
  apiKey: 'AIzaSyDSd6EXdQWaWcBMxbTYp-kFAV3zxNu-ArM',
  authDomain: 'ngx-repository.firebaseapp.com',
  databaseURL: 'https://ngx-repository.firebaseio.com',
  projectId: 'ngx-repository',
  storageBucket: 'ngx-repository.appspot.com',
  messagingSenderId: '352664344689',
  appId: '1:352664344689:web:20ec56387616cba621e3d0',
  measurementId: 'G-0RD9MTX3PB'
}));

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      CoreModule,
      FormsModule,
      SystemModule,
      InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),
      NgxFirestoreRepositoryModule.forRoot({
        debug: true
      }),
      NgxHttpRepositoryModule.forRoot({
        debug: true
      }),
    ),
    provideRouter(routes, withRouterConfig({
      onSameUrlNavigation: 'reload'
    })),
    provideNgxRepository({
      normalizerConfiguration: {
        denormalizeNull: true,
        normalizeNull: false,
        denormalizeUndefined: true,
        normalizeUndefined: false
      }
    }),
    MyPageResponseProcessor,
    {
      provide: FIRESTORE_APP,
      useFactory: createFirestore
    }
  ]
}).catch((err: Error) => console.error(err));
