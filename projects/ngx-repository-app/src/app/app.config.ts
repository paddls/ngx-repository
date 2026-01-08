import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FIRESTORE_APP, provideNgxFirestoreRepository } from '@paddls/ngx-firestore-repository';
import { MyPageResponseProcessor } from './module/@core/processor/my-page-response.processor';
import { provideNgxHttpRepository } from '@paddls/ngx-http-repository';
import { provideNgxRepository } from '@paddls/ngx-repository';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { Firestore, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './module/@core/core.module';
import { FormsModule } from '@angular/forms';
import { SystemModule } from './module/@system/system.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';

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

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      CoreModule,
      FormsModule,
      SystemModule,
      InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),
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
    provideNgxHttpRepository({
      debug: true
    }),
    provideNgxFirestoreRepository({
      debug: true
    }),
    MyPageResponseProcessor,
    {
      provide: FIRESTORE_APP,
      useFactory: createFirestore
    }
  ]
};
