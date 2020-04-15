import {Connection} from '../connection';
import {HttpRepository} from '../../repository/http/http.repository';
import {Injectable, InjectionToken, Injector, StaticProvider} from '@angular/core';
import {HttpDriver} from '../../driver/http/http.driver';
import {HTTP_RESOURCE_METADATA_KEY, HttpResourceContext} from '../../decorator/http/http-resource.decorator';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {HttpQueryBuilder} from '../../query-builder/http/http.query-builder';
import {Observable} from 'rxjs';
import {Normalizer} from '../../normalizer/normalizer';
import {Denormalizer} from '../../normalizer/denormalizer';
import {HTTP_DENORMALIZER_TOKEN, HTTP_PAGE_BUILDER_TOKEN} from '../../ngx-repository.module.di';
import {PageBuilder} from '../../page-builder/page-builder';

@Injectable()
export class HttpConnection extends Connection<HttpResourceContext, HttpRequest<any>, Observable<HttpResponse<any>>> {

  protected injector: Injector;

  protected providers: StaticProvider[];

  public constructor(protected parentInjector: Injector) {
    super(HTTP_RESOURCE_METADATA_KEY);

    this.providers = [];

    this.injector = Injector.create({
      providers: this.providers,
      parent: this.parentInjector
    });
  }

  protected getRepositoryInstance<T, K>(resourceType: new(...args: any) => T): HttpRepository<T, K> {
    const token: InjectionToken<HttpRepository<T, K>> = this.makeToken(resourceType);
    let repository: HttpRepository<T, K>;

    try {
      repository = this.injector.get(token);
    } catch (err) {
      this.providers.push({
        provide: token,
        useFactory: (httpDriver: HttpDriver,
                     normalizer: Normalizer,
                     denormalizer: Denormalizer,
                     httpQueryBuilder: HttpQueryBuilder,
                     httpPageBuilder: PageBuilder<Observable<HttpResponse<any>>>): HttpRepository<T, K> => {
          return new HttpRepository<T, K>(
            httpDriver,
            normalizer,
            denormalizer,
            httpQueryBuilder,
            httpPageBuilder
          );
        },
        deps: [HttpDriver, Normalizer, HTTP_DENORMALIZER_TOKEN, HttpQueryBuilder, HTTP_PAGE_BUILDER_TOKEN]
      });

      this.injector = Injector.create({
        providers: this.providers,
        parent: this.parentInjector
      });

      repository = this.injector.get(token);
    }

    return repository;
  }

  protected makeToken<T, K>(resourceType: new(...args: any) => T): InjectionToken<HttpRepository<T, K>> {
    return new InjectionToken<HttpRepository<T, K>>(`${resourceType.name}_Repository$`);
  }
}
