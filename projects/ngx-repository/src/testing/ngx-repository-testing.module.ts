import 'reflect-metadata';

import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { NgxRepositoryService } from '../lib/ngx-repository.service';
import { TestRepositoryBuilder } from './test-repository.builder';
import { AbstractRepository } from '../lib/core/repository/abstract-repository';
import { MockRepository } from './mock.repository';
import { NgxRepositoryTestingService } from './ngx-repository-testing.service';

/**
 * @ignore
 */
const MODULE_PROVIDERS: Provider[] = [];

/**
 * @ignore
 */
// @dynamic
@NgModule({
  providers: MODULE_PROVIDERS
})
export class NgxRepositoryTestingModule {

  private static testRepositoryBuilder: TestRepositoryBuilder;

  public static forTest(): ModuleWithProviders<NgxRepositoryTestingModule> {
    this.testRepositoryBuilder = new TestRepositoryBuilder();
    const repositoryService: NgxRepositoryService = new NgxRepositoryTestingService(this.testRepositoryBuilder) as any;
    NgxRepositoryService.getInstance = () => repositoryService;

    return {
      ngModule: NgxRepositoryTestingModule,
      providers: []
    };
  }

  public static getRepository<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): MockRepository<T> {
    return NgxRepositoryTestingModule.testRepositoryBuilder.getRepository(resourceType, repositoryType) as any;
  }
}
