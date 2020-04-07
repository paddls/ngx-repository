import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {NormalizerConfiguration} from '@witty-services/repository-core';
import {HttpClientModule} from '@angular/common/http';
import {HttpConnection} from './connection/http.connection';
import {HttpDriver} from './driver/http.driver';
import {FirebaseConnection} from './connection/firebase.connection';
import {FirebaseDriver} from './driver/firebase.driver';

export interface Config {
  normalizerConfiguration: NormalizerConfiguration;
}

const moduleProviders: Provider[] = [
  FirebaseConnection,
  FirebaseDriver,
  HttpConnection,
  HttpDriver
];

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: NormalizerConfiguration,
      useValue: new NormalizerConfiguration()
    },
    ...moduleProviders,
  ]
})
export class NgxRepositoryModule {

  public static forRoot(config?: Config): ModuleWithProviders<NgxRepositoryModule> {
    return {
      ngModule: NgxRepositoryModule,
      providers: [
        {
          provide: NormalizerConfiguration,
          useValue: config && config.normalizerConfiguration ? config.normalizerConfiguration : new NormalizerConfiguration()
        },
        ...moduleProviders
      ]
    };
  }
}
