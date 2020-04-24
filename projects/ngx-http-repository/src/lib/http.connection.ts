import {HttpRepository} from './http.repository';
import {Injectable, InjectionToken, Injector, StaticProvider} from '@angular/core';
import {HttpDriver} from './http.driver';
import {HTTP_RESOURCE_METADATA_KEY, HttpResourceContext} from './decorator/http-resource.decorator';
import {HttpResponse} from '@angular/common/http';
import {HttpQueryBuilder} from './http.query-builder';
import {
  HTTP_DENORMALIZER_TOKEN,
  HTTP_CREATE_RESPONSE_BUILDER,
  HTTP_FIND_ONE_RESPONSE_BUILDER,
  HTTP_PAGE_BUILDER_TOKEN
} from './ngx-http-repository.module.di';
import {Connection, Denormalizer, Normalizer, PageBuilder, ResponseBuilder} from '@witty-services/ngx-repository';

@Injectable()
export class HttpConnection extends Connection<HttpResourceContext, HttpResponse<any>> {

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
                     httpPageBuilder: PageBuilder<HttpResponse<any>>,
                     httpItemCreateBuilder: ResponseBuilder<HttpResponse<any>>,
                     httpItemFindOneBuilder: ResponseBuilder<HttpResponse<any>>,
                     injector: Injector): HttpRepository<T, K> => {
          const httpResourceContext: HttpResourceContext = Reflect.getMetadata(this.resourceContextKey, resourceType);
          if (httpResourceContext.create && httpResourceContext.create instanceof Object) {
            const createResponseBuilder: ResponseBuilder<HttpResponse<any>> = injector.get(httpResourceContext.create.responseBuilder);
            if (!createResponseBuilder) {
              throw new Error(`${httpResourceContext.create.responseBuilder.name} is not found in Angular Injector.`);
            }
            httpItemCreateBuilder = createResponseBuilder;
          }

          return new HttpRepository<T, K>(
            httpDriver,
            normalizer,
            denormalizer,
            httpQueryBuilder,
            httpPageBuilder,
            httpItemCreateBuilder,
            httpItemFindOneBuilder
          );
        },
        deps: [
          HttpDriver,
          Normalizer,
          HTTP_DENORMALIZER_TOKEN,
          HttpQueryBuilder,
          HTTP_PAGE_BUILDER_TOKEN,
          HTTP_CREATE_RESPONSE_BUILDER,
          HTTP_FIND_ONE_RESPONSE_BUILDER,
          Injector
        ]
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
    return new InjectionToken<HttpRepository<T, K>>(`${resourceType.name}_HttpRepository$`);
  }
}
