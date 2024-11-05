import { TestBed } from '@angular/core/testing';
import { NgxRepositoryService } from './ngx-repository.service';
import { AbstractRepository } from './core/repository/abstract-repository';
import { Injectable, InjectionToken, Type } from '@angular/core';
import { REPOSITORY_BUILDER_TOKEN } from './ngx-repository.module.di';
import { TokenRegistry } from './core/registry/token.registry';
import { RepositoryBuilder } from './core/repository/repository.builder';

describe('NgxRepositoryService', () => {

  class Book {
  }

  class MyBookRepository {
  }

  class MyTokenBookRepository {
  }

  @Injectable()
  class MyExistingBookRepository {

  }

  let service: NgxRepositoryService;

  it('should get existing repository when provided by injector', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        MyExistingBookRepository,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: []
        }
      ]
    });

    service = TestBed.inject(NgxRepositoryService);

    expect(service.getRepository(Book, MyExistingBookRepository as any)).toBeInstanceOf(MyExistingBookRepository);
  });

  it('should get single repository when provided by token registry', () => {
    const REPOSITORY: InjectionToken<RepositoryBuilder> = new InjectionToken<RepositoryBuilder>('REPOSITORY');

    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: []
        },
        {
          provide: REPOSITORY,
          useValue: new MyTokenBookRepository()
        }
      ]
    });

    spyOn(TokenRegistry, 'findToken').and.returnValue(REPOSITORY);

    service = TestBed.inject(NgxRepositoryService);

    expect(service.getRepository(Book, MyTokenBookRepository as any)).toBeInstanceOf(MyTokenBookRepository);
  });

  it('should throw error when no repository type and multiple repository token', () => {
    const REPOSITORY: InjectionToken<RepositoryBuilder> = new InjectionToken<RepositoryBuilder>('REPOSITORY');

    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: []
        },
        {
          provide: REPOSITORY,
          useValue: [
            new MyTokenBookRepository(),
            new MyBookRepository()
          ]
        }
      ]
    });

    spyOn(TokenRegistry, 'findToken').and.returnValue(REPOSITORY);

    service = TestBed.inject(NgxRepositoryService);

    expect(() =>
      service.getRepository(Book, undefined)
    ).toThrowError('With multiple connection types, you must provide the repository argument in JoinColumn, SubCollection and InjectRepository decorator of your Book resource.');
  });

  it('should get right repository when several provided by token registry', () => {
    const REPOSITORY: InjectionToken<RepositoryBuilder> = new InjectionToken<RepositoryBuilder>('REPOSITORY');

    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: []
        },
        {
          provide: REPOSITORY,
          useValue: [
            new MyTokenBookRepository(),
            new MyBookRepository()
          ]
        }
      ]
    });

    spyOn(TokenRegistry, 'findToken').and.returnValue(REPOSITORY);

    service = TestBed.inject(NgxRepositoryService);

    expect(service.getRepository(Book, MyTokenBookRepository as any)).toBeInstanceOf(MyTokenBookRepository);
  });

  it('should throw error when attempting to create a repository with no builder', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: []
        }
      ]
    });

    service = TestBed.inject(NgxRepositoryService);

    expect(() => service.getRepository(Book, MyBookRepository as any)).toThrowError('There is no connection configured.');
  });

  it('should create repository of a single builder', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: [
            {
              getRepository: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => `${resourceType.name} - ${repositoryType.name}`
            }
          ]
        }
      ]
    });

    service = TestBed.inject(NgxRepositoryService);

    spyOn(TokenRegistry, 'addTokenToRegistry').and.stub();

    const repository: any = service.getRepository(Book, MyBookRepository as any);

    expect(TokenRegistry.addTokenToRegistry).toHaveBeenCalledWith(Book, MyBookRepository as any);
    expect(repository).toEqual('Book - MyBookRepository');
  });

  it('should throw error when multiple builders and repository type is not configured', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: [
            {
              getRepository: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => `${resourceType.name} - ${repositoryType.name}`
            },
            {
              getRepository: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => `${resourceType.name} - ${repositoryType.name}`
            }
          ]
        }
      ]
    });

    service = TestBed.inject(NgxRepositoryService);

    expect(() =>
      service.getRepository(Book, undefined)
    ).toThrowError('With multiple connection types, you must provide the repository argument in JoinColumn, SubCollection and InjectRepository decorators of your Book resource.');
  });

  it('should throw error when multiple builders and none supporting type', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: [
            {
              supports: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => resourceType && repositoryType && false,
              getRepository: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => `WRONG ${resourceType.name} - ${repositoryType.name}`
            },
            {
              supports: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => resourceType && repositoryType && false,
              getRepository: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => `WRONG ${resourceType.name} - ${repositoryType.name}`
            }
          ]
        }
      ]
    });

    service = TestBed.inject(NgxRepositoryService);

    expect(() => service.getRepository(Book, MyBookRepository as any)).toThrowError('There is no RepositoryBuilder to support MyBookRepository repository type');
  });

  it('should create repository with first supporting builder', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxRepositoryService,
        {
          provide: REPOSITORY_BUILDER_TOKEN,
          useValue: [
            {
              supports: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => resourceType && repositoryType && false,
              getRepository: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => `WRONG ${resourceType.name} - ${repositoryType.name}`
            },
            {
              supports: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => resourceType || repositoryType || true,
              getRepository: (resourceType: Type<any>, repositoryType?: Type<AbstractRepository<any>>) => `OK ${resourceType.name} - ${repositoryType.name}`
            }
          ]
        }
      ]
    });

    service = TestBed.inject(NgxRepositoryService);

    spyOn(TokenRegistry, 'addTokenToRegistry').and.stub();

    const repository: any = service.getRepository(Book, MyBookRepository as any);

    expect(TokenRegistry.addTokenToRegistry).toHaveBeenCalledWith(Book, MyBookRepository as any);
    expect(repository).toEqual('OK Book - MyBookRepository');
  });
});
