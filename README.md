# NGX-REPOSITORY

![ngx-repository-ci](https://github.com/paddls/ngx-repository/workflows/build/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/paddls/ngx-repository/badge.svg?branch=master)](https://coveralls.io/github/paddls/ngx-repository?branch=master)
[![npm version](https://badge.fury.io/js/%40paddls%2Fngx-repository.svg)](https://badge.fury.io/js/%40paddls%2Fngx-repository)
![GitHub](https://img.shields.io/github/license/paddls/ngx-repository)
![GitHub repo size](https://img.shields.io/github/repo-size/paddls/ngx-repository)
![GitHub last commit](https://img.shields.io/github/last-commit/paddls/ngx-repository)
![GitHub issues](https://img.shields.io/github/issues/paddls/ngx-repository)
![GitHub top language](https://img.shields.io/github/languages/top/paddls/ngx-repository)

Easily create a **strongly typed data access layer** in your **Angular** project.

## Summary

* [How to install](#how-to-install)
  * [Recommended Angular versions](#recommended-angular-versions)
  * [Main module](#main-module)
  * [Http Driver](#http-driver)
  * [Firestore Driver](#firestore-driver)
  * [Import Modules](#import-modules)
* [Basic usage](#basic-usage)
  * [Resource](#resource)
    * [HttpResource and FirestoreResource](#httpresource-and-firestoreresource)
    * [Id and Column](#id-and-column)
  * [Repository](#repository)
* [Id and Column configuration](#id-and-column-configuration)
* [Path parameters and PathColumn](#path-parameters-and-pathcolumn)
* [Fetch associated resource](#fetch-associated-resources)
  * [JoinColumn](#joincolumn)
  * [SubCollection](#subcollection)
* [Query](#query)
* [Resource configuration](#resource-configuration)
* [HTTP Pagination](#http-pagination)
  * [Page type](#page-type)
  * [Page response processor](#page-response-processor)
* [HttpLiveResource](#httpliveresource)
* [@FirestoreCreatedAt and @FirestoreUpdatedAt](#firestorecreatedat-and-firestoreupdatedat)
* [Advanced usage](#advanced-usage)
  * [Custom repository](#custom-repository)
  * [Custom HTTP API](#custom-http-api)
  * [Event system](#event-system)
* [Test and debug](#test-and-debug)
  * [NgxRepositoryTestingModule](#ngxrepositorytestingmodule)
  * [Enable debug mode](#enable-debug-mode)
* [Install and build project](#install-and-build-project)

## How to install

### Recommended Angular versions

| `Angular`          | `NgxRepository`   |
|--------------------|-------------------|
| `14.0.0` and above | `4.0.1` and above |
| `13.0.0` and above | `3.0.0` and above |
| `8.0.0` and above  | `1.0.0` and above |

### Main module

First install the main library in your project :

```shell script
npm install --save @paddls/ngx-repository
```

After that, choose drivers and install them as follows.

### Http Driver

```shell script
npm install --save @paddls/ngx-http-repository
```

### Firestore Driver

```shell script
npm install --save @paddls/ngx-firestore-repository
```

### Import modules

To start using NgxRepository, import `NgxRepositoryModule` and the modules corresponding to the chosen drivers :

```typescript
import { NgxRepositoryModule } from '@paddls/ngx-repository';
import { NgxHttpRepositoryModule } from '@paddls/ngx-http-repository';
import { NgxFirestoreRepositoryModule } from '@paddls/ngx-firestore-repository';

@NgModule({
  imports: [
    NgxRepositoryModule.forRoot(),
    NgxHttpRepositoryModule, // Http driver
    NgxFirestoreRepositoryModule.forRoot(
      firebase.initializeApp({
        apiKey: 'TODO',
        authDomain: 'TODO',
        databaseURL: 'TODO',
        projectId: 'TODO',
        storageBucket: 'TODO',
        messagingSenderId: 'TODO',
        appId: 'TODO',
        measurementId: 'TODO'
      }).firestore()
    ), // Firestore driver
  ]
})
export class AppModule {
}
```

## Basic usage

This library abstracts the data access layer of your Angular project. You just need to provide some configuration thanks
to typescript decorators to start using auto-generated repositories.

### Resource

Start by creating a Typescript class for the type of resource you need to manipulate with NgxRepository. Once this is
done, you can start annotating this class with the following decorators.

#### HttpResource and FirestoreResource

First, add a `@HttpResource()` or `@FirestoreResource()` decorator (depending on which protocol you wish to use)
on the resource class. The most basic configuration for this annotation consists in giving the HTTP or Firestore
resource path of the resource.

```typescript
import { FirestoreResource } from '@paddls/ngx-firestore-repository';
import { HttpResource } from '@paddls/ngx-http-repository';

// for Http
@HttpResource({
  path: '/api/users'
})
// or for Firestore
@FirestoreResource({
  path: '/users'
})
export class User {
  // ...
}
```

#### Id and Column

Then, add an `@Id()` decorator on the resource id and `@Column()` decorators on each resource field you want mapped with
NgxRepository.

```typescript
import { FirestoreResource } from '@paddls/ngx-firestore-repository';
import { HttpResource } from '@paddls/ngx-http-repository';
import { Id, Column } from '@paddls/ngx-repository';

// for Http
@HttpResource({
  path: '/api/users'
})
// or for Firestore
@FirestoreResource({
  path: '/users'
})
export class User {

  @Id() // define the resource id
  public id: number;

  @Column() // define a column
  public firstName: string;

  @Column()
  public lastName: string;
}
```

### Repository

Right, now you have your resources. NgxRepository will generate all repositories on demand. You just have to inject it
in your services using the
`@InjectRepository()` decorator. You need to specify in the decorator context the type of your resource and the type of
your repository(`HttpRepository`, `FirestoreRepository`...).

The generic types of the generated repository type are the type of the resource and the type of the resource id.

```typescript
import { InjectRepository, Page } from '@paddls/ngx-repository';
import { HttpRepository } from '@paddls/ngx-http-repository'

@Injectable()
export class BookService {

  // repository is build with Http driver for User resource
  @InjectRepository({resourceType: () => Book, repository: () => HttpRepository})
  private readonly bookRepository: HttpRepository<Book, number>;

  public findAll(): Observable<Page<Book>> {
    return this.bookRepository.findAll();
  }

  // returns the id of created resource
  public create(book: Book): Observable<number> {
    return this.bookRepository.create(book);
  }

  // observable completes when update is effective
  public update(book: Book): Observable<void> {
    return this.bookRepository.update(book);
  }
}
```

Each repository of a resource made from `FirestoreDriver` or `HttpDriver` are singleton services stored in Angular
Injector, so don't worry about injecting them on several services.

Last but not least : NgxRepository automatically serializes and deserializes your resources between JSON and strongly
typed TypeScript classes. Note that only fields with
`@Id()` or `@Column()` decorators are marked for serialization.

## Id and Column configuration

You can add configuration to `@Id()` and `@Column()` decorators as follows.

```typescript
import { HttpResource } from '@paddls/ngx-http-repository';
import { Id, Column, DateConverter } from '@paddls/ngx-repository';

@HttpResource({
  path: '/api/users'
})
export class User {

  @Id() // define the resource id
  public id: number;

  @Column() // define a column
  public firstName: string;

  @Column('lastname')  // define a column with special mapping
  public lastName: string;

  @Column(() => Address) // define a column with a child model
  public address: Address;

  @Column({type: () => Job, field: 'job'}) // combine model and special mapping
  public myJob: Job;

  @Column({field: 'createdAt', customConverter: () => DateConverter}) // use custom converter for special type
  public createdAt: Date;
}
```

As shown in the example above, each configuration field is optional : you can define any field you want or not to have
any configuration at all.

| Field                  | Description                                                                                                     | Available on `@Id()`   |
|------------------------|-----------------------------------------------------------------------------------------------------------------|------------------------|
| `field`                | Field name in JSON                                                                                              | Yes                    |
| `type`                 | Field type after deserialization : only fields with `@Id()` or `@Column()` decorator in type will be serialized | No                     |
| `readOnly`             | Boolean to indicate to not send the value in json to the server                                                 | Yes                    |
| `writeOnly`            | Boolean to indicate to ignore the field in json                                                                 | Yes                    |
| `customConverter`      | A converter to make a custom serialization/deserialization                                                      | No                     |
| `denormalizeNull`      | Boolean to override global configuration to denormalize the column when is set to null value                    | Yes                    |
| `denormalizeUndefined` | Boolean to override global configuration to denormalize the column when is set to undefined value               | Yes                    |
| `normalizeNull`        | Boolean to override global configuration to normalize the column when is set to null value                      | Yes                    |
| `normalizeUndefined`   | Boolean to override global configuration to normalize the column when is set to undefined value                 | Yes                    |
|

The `field` and `type` fields can be defined using a shorthand. For `field`, just specify a string directly in the
context, it will be interpreted as such. Same thing for `type` : specify directly an anonymous function returning the
type in the context
(as shown in the example).

## Path parameters and PathColumn

You can add parameters on a resource path using `:` character. You can map those parameters with values using
the [query system](#query).

`@PathColumn()` decorator allows you to retrieve the path parameter value of a resource and map it to the decorated
field.

```typescript
import { HttpResource } from '@paddls/ngx-http-repository';
import { Id, Column, PathColumn } from '@paddls/ngx-repository';

@HttpResource({
  path: '/libraries/:libraryId/books'
})
export class Book {

  @Id()
  public id: number;

  @Column()
  public title: string;

  @PathColumn()
  public libraryId: string;

  // or

  @PathColumn('libraryId')
  public theLibraryId: string;

}
```

## Fetch associated resources

### JoinColumn

You can fetch associated resources using `JoinColumn`.

```typescript
import { HttpResource } from '@paddls/ngx-http-repository';
import { Id, Column, JoinColumn } from '@paddls/ngx-repository';
import { FirestoreRepository } from '@paddls/ngx-firestore-repository';

@HttpResource({
  path: '/libraries/:libraryId/books'
})
export class Book {

  @Id()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public authorId: string;

  // initialize the request to get associated author, using instance attribute 'authorId' with User FirestoreRepository
  @JoinColumn({attribute: 'authorId', resourceType: () => User, repository: () => FirestoreRepository})
  public author$: Observable<Person>; // data will be lazy fetched on subscribe
}
```

### SubCollection

You can fetch associated resources using `SubCollection`.

```typescript
import { HttpResource, HttpRepository } from '@paddls/ngx-http-repository';
import { Id, Column, SubCollection } from '@paddls/ngx-repository';

@HttpResource({
  path: '/libraries/:libraryId/books'
})
export class Book {

  @Id()
  public id: number;

  @Column()
  public title: string;

  // you should specify the corresponding resource, how to request resources and the repository to use
  @SubCollection({
    resourceType: () => Comment,
    // params are extra information context request (for example libraryId in path) 
    params: (book: Book, params: any) => new CommentQuery({bookId: book.id, libraryId: params.libraryId}),
    repository: () => HttpRepository
  })
  public comments$: Observable<Comment[]>;
}
```

## Query

With NgxRepository, a Query is an object holding some informations associated with the querying of one or several
resources. You can then provide an instance of this Query as a parameter of any method available on `HttpRepository`
or `FirestoreRepository`.

Here is an example of a query for a `@HttpResource()` :

```typescript
import { HttpQueryParam, HttpHeader } from '@paddls/ngx-http-repository';
import { PathParam } from '@paddls/ngx-repository';

export class BookQuery {

  // use http query param

  @HttpQueryParam() // param is forwarded into http query param
  public title: string;

  // or

  @HttpQueryParam('title')
  public theTitle: string;

  // use path param

  @PathParam() // param replace :libraryId into resource path
  public libraryId: string;

  // or

  @PathParam('libraryId')
  public library: string;

  // use http header

  @HttpHeader() // path is forwarded into http header
  public page: number = 1;

  // or

  @HttpHeader('itemPerPage')
  public size: number = 2;

  public constructor(data: Partial<BookQuery> = {}) {
    Object.assign(this, data);
  }
}
```

And an example of a query for a `@FirestoreResource()` :

```typescript
import {
  FirestoreCriteria,
  FirestoreEndAt,
  FirestoreEndBefore,
  FirestoreLimit,
  FirestoreLimitToLast,
  FirestoreOrderBy,
  FirestoreOrderByContext,
  FirestoreStartAfter,
  FirestoreStartAt
} from '@paddls/ngx-firestore-repository';

export class ClientQuery {

  @FirestoreCriteria({field: 'lastName', operator: '=='})
  public lastNameEqual?: string;

  @FirestoreOrderBy()
  public orderBy?: string | FirestoreOrderByContext | (FirestoreOrderByContext | string)[];

  @FirestoreStartAt()
  public startAt?: any;

  @FirestoreStartAfter()
  public startAfter?: any;

  @FirestoreEndAt()
  public endAt?: any;

  @FirestoreEndBefore()
  public endBefore?: any;

  @FirestoreLimit()
  public limit?: number;

  @FirestoreLimitToLast()
  public limitToLast?: number;

  public constructor(data: Partial<ClientQuery> = {}) {
    Object.assign(this, data);
  }
}
```

The following table lists all the type of fields you can add to a query object and with which repository they are
available.

| Decorator                 | Description                                                       | Repository type                         |
|---------------------------|-------------------------------------------------------------------|-----------------------------------------|
| `@PathParam()`            | Replaces path parameter with field value                          | `HttpRepository`, `FirestoreRepository` |
| `@HttpQueryParam()`       | Adds a query param to the HTTP request (eg. `/users/?name=Oscar`) | `HttpRepository`                        |
| `@HttpHeader()`           | Adds a HTTP header to the request with field value                | `HttpRepository`                        |
| `@FirestoreCriteria()`    | Adds a Firestore query criteria                                   | `FirestoreRepository`                   |
| `@FirestoreOrderBy()`     | Adds a `.orderBy()` clause to Firestore request                   | `FirestoreRepository`                   |
| `@FirestoreLimit()`       | Adds a `.limit()` clause to Firestore request                     | `FirestoreRepository`                   |
| `@FirestoreLimitToLast()` | Adds a `.limitToLast()` clause to Firestore request               | `FirestoreRepository`                   |
| `@FirestoreStartAt()`     | Adds a `.startAt()` query cursor to Firestore request             | `FirestoreRepository`                   |
| `@FirestoreStartAfter()`  | Adds a `.startAfter()` query cursor to Firestore request          | `FirestoreRepository`                   |
| `@FirestoreEndAt()`       | Adds a `.endAt()` query cursor to Firestore request               | `FirestoreRepository`                   |
| `@FirestoreEndBefore()`   | Adds a `.endBefore()` query cursor to Firestore request           | `FirestoreRepository`                   |

The following example shows a query used in a `findAll()` operation on a Firestore resource.

```typescript
@Injectable()
export class ClientService {

  @InjectRepository({resourceType: () => Client, repository: () => FirestoreRepository})
  private repository: FirestoreRepository<Client, string>;

  public searchByLastName(searchedLastName: string): Observable<Page<Client>> {
    return this.repository.findAll(new ClientQuery({
      lastNameEqual: searchedLastName,
      orderBy: ['firstName']
    }));
  }
}
```

## Resource configuration

You can configure your resource to your needs by adding context to `@HttpResource()`
and `@FirestoreResource()` resource decorators.

> For example, you may need to specify a different path to your resource depending on
> the operation. This can be done by using the syntax in the following example.

```typescript
@HttpResource({
  path: '/libraries',
  update: '/library',
})
export class Library {

}
```

For each operation execution, NgxRepository will look for a specific context attached to the operation for the resource.
If no specific context is found, the default context
(here the `path`) will be used.

The available configuration is different depending on the type of resource and the targeted operation.

The targetable operations are the following :

* `findById`
* `findOne`
* `findAll`
* `create`
* `update`
* `patch`
* `delete`
* `read`
* `write`

**Response type**

Define a specific response type (different from the resource) using `responseType`
context parameter.

```typescript
@HttpResource({
  path: '/libraries',
  write: {
    responseType: () => WriteLibraryDto
  }
})
export class Library {

}
```

**Path**

Define a specific path for an operation using `path` context parameter. Passing a string directly as an operation
context is also possible to define the `path` context parameter.

> ⚠️ This context parameter is only available for `@HttpResource()`

```typescript
@HttpResource({
  path: '/libraries',
  create: {
    path: '/create-a-library'
  },
  update: '/update-a-library'
})
export class Library {

}
```

**Page response processor**

Define a specific [page response processor](#page-response-processor) using
`pageResponseProcessor` context parameter.

> ⚠️ This context parameter is only available for `findAll` operation and
> `@HttpResource()`

```typescript
@HttpResource({
  path: '/libraries',
  findAll: {
    pageResponseProcessor: MyPageResponseProcessor
  }
})
export class Library {

}
```

**Global configuration**

It is also possible to add some global configuration by adding it directly in the
`forRoot()` method of your driver module import.

## HTTP Pagination

> ⚠️ This feature is only available for `@HttpResource()`

### Page type

NgxRepository comes with a prebuilt HTTP pagination system. If a `@HttpResource()` is paginated server-side, the server
usually sends in the HTTP response some context about the data being sent (page number, total number of elements and
page size). NgxRepository holds these infos in a `Page` object.

The `Page` class extends the `Array` type and exposes additional infos about eventual server-side pagination.

This is the implementation of the `Page` type :

```typescript
export class Page<T = any> extends Array<T> {

  public currentPage: number;

  public itemsPerPage: number;

  public totalItems: number;
}
```

The `findAll` method of `HttpRepository` returns a `Observable<Page<T>>`
where `T` is your resource. You can use it as an `Array` or as a `Page`
if you want to access the pagination infos.

### Page response processor

By default, the fields of the `Page` object returned by the
`findAll`method of `HttpRepository` will be equal to :

* `0` for the `currentPage` field
* `items.length` for the `itemsPerPage` and `totalItems` fields

This is because the pagination infos can be returned in different ways (sometimes in the response headers, sometimes in
the body... ). To indicate how the server returns these elements, you have to create a `PageResponseProcessor`.

```typescript
import { Injectable } from '@angular/core';
import { Page, RequestManagerContext, ResponseProcessor } from '@paddls/ngx-repository';
import { HttpRepositoryResponse } from '@paddls/ngx-http-repository';

@Injectable()
export class MyPageResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: HttpRepositoryResponse, context: RequestManagerContext): any {
    const totalItems: number = parseInt(origin.getHeaders().get('apiTotalItems'), 10);
    const itemsPerPage: number = parseInt(origin.getHeaders().get('apiPerPage'), 10);
    const currentPage: number = parseInt(origin.getHeaders().get('apiCurrentPage'), 10);

    return Page.build(response, currentPage, itemsPerPage, totalItems);
  }
}
```

A `PageResponseProcessor` implements the `ResponseProcessor` interface. This interface exposes a `transform()` method
which transforms the HTTP response. In this method, you can build a `Page` object using the infos about the HTTP
response provided in the `transform()` method parameters.

Then, provide this processor in your `AppModule` and add it to any `findAll` configuration you need. It can be on a
[specific `HttpResource()` or globally](#resource-configuration).

## HttpLiveResource

> ⚠️ This feature is only available for `@HttpResource()`

If you want to build a truly reactive app, you may need the data displayed in your app to always be in sync with
server's data. This can be achieved by sending a new GET request each time a POST, PUT, PATCH or DELETE request is made.

By annotating your model with ``@HttpLiveResource()`` decorator, each observable returned by ``findAll()``
, ``findOne()`` or ``findById()`` method will be transformed into a hot observable that will emit a new value each time
a writing method is called on the repository.

```typescript
import { HttpLiveResource, HttpResource } from '@paddls/ngx-http-repository';

@HttpLiveResource()
@HttpResource('/libraries')
export class Library {
}
```

## Multipart

> ⚠️ This feature is only available for `@HttpResource()`

To enable multipart, you should specify `multipart`field from `write`, `create`, `update`, `patch`, `delete`.
Then you can specified each part on field using `@HttpMultipartColumn` decorator.

```typescript
import { HttpMultipartColumn, HttpResource } from '@paddls/ngx-http-repository';

@HttpResource({
    path: '/libraries',
    write: {
      multipart: 'partNameOfLibrary',
    }
})
export class Library {

    @HttpMultipartColumn('partNameOfFile')
    public file: File
}
```

## FirestoreCreatedAt and FirestoreUpdatedAt

Use `@FirestoreCreatedAt()` and `@FirestoreUpdatedAt()` decorators on a `@FirestoreResource()` field to automatically
inject creation and last update date of each resource firestore document.

You can also retrieve information for a particular resource field by adding its property name directly in the decorator
context.

```typescript
@FirestoreResource({
  path: '/clients'
})
export class Client {

  @Id()
  public id: string;

  @Column()
  public name: string;

  @FirestoreCreatedAt()
  public createdAt: Date;

  @FirestoreUpdatedAt('name')
  public updatedAt: Date;

  public constructor(data: Partial<Client> = {}) {
    Object.assign(this, data);
  }
}

```

## Advanced usage

### Custom Repository

In specific case, you can define a custom repository like that :

```typescript
import { Repository } from '@paddls/ng-repository';
import { HttpRepository, HTTP_REPOSITORY_CONFIGURATION } from '@paddls/ng-http-repository';

@Injectable()
@Repository(() => Person)
export class PersonRepository extends HttpRepository<Person, string> {

  // use global configuration
  public constructor(requestManager: RequestManager,
                     driver: HttpRepositoryDriver,
                     @Inject(HTTP_REPOSITORY_CONFIGURATION)
                       configuration: ResourceConfiguration) {
    super(requestManager, driver, configuration);
  }

  // overide global configuration
  public constructor(requestManager: RequestManager,
                     driver: HttpRepositoryDriver) {
    super(requestManager, driver, {
      // ... my configuration here
    });
  }

  public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
    // write your custom logic here
  }
}

@Injectable()
export class PersonService {

  // Like a standard service, you can inject your custom repository
  public constructor(private readonly personRepository: PersonRepository) {
  }
}
```

### Custom HTTP API

Sometimes, you may use an HTTP API that does not fit REST standards. For example, you may want to send GET requests with
bodies or requests with a response type different from body type.

To do that, simply create an ``@Injectable()`` class and define your API methods inside like in the following example :

```typescript
@Injectable()
class Api {

  @HttpGet('/api', () => ApiResponse)
  public get: HttpQueryFn<ApiResponse>;

  @HttpGet({
    path: '/api',
    withBody: true
  }, () => ApiResponse)
  public getWithBody: HttpBodyFn<ApiResponse>;

  @HttpGet({
    path: '/api',
    postResponseProcessors: PageResponseProcessor
  }, () => ApiResponse)
  public getWithResponseProcessor: HttpQueryFn<Page<ApiResponse>>;

  @HttpGet('/api/:version', () => ApiResponse)
  public getWithPathParam: HttpQueryFn<ApiResponse>;

  @HttpPost('/api', () => ApiResponse)
  public post: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpPost({
    path: '/api',
    postResponseProcessors: [PageResponseProcessor]
  }, () => ApiResponse)
  public postWithResponseProcessor: HttpBodyFn<Page<ApiResponse>>;

  @HttpPost({
    path: '/api',
    withBody: false
  }, () => ApiResponse)
  public postWithoutBody: HttpQueryFn<Page<ApiResponse>>;

  @HttpPost('/api/:version', () => ApiResponse)
  public postWithPathParam: HttpBodyFn<ApiResponse>;

  @HttpPut('/api', () => ApiResponse)
  public put: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpPut('/api/:version', () => ApiResponse)
  public putWithPathParam: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpPut({
    path: '/api',
    withBody: false
  }, () => ApiResponse)
  public putWithoutBody: HttpQueryFn<ApiResponse, ApiRequest>;

  @HttpPut({
    path: '/api',
    postResponseProcessors: [PageResponseProcessor]
  }, () => ApiResponse)
  public putWithResponseProcessor: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpPatch('/api', () => ApiResponse)
  public patch: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpPatch('/api/:version', () => ApiResponse)
  public patchWithPathParam: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpPatch({
    path: '/api',
    withBody: false
  }, () => ApiResponse)
  public patchWithoutBody: HttpQueryFn<ApiResponse, ApiRequest>;

  @HttpPatch({
    path: '/api',
    postResponseProcessors: [PageResponseProcessor]
  }, () => ApiResponse)
  public patchWithResponseProcessor: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpDelete('/api', () => ApiResponse)
  public delete: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpDelete('/api/:version', () => ApiResponse)
  public deleteWithPathParam: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpDelete({
    path: '/api',
    withBody: false
  }, () => ApiResponse)
  public deleteWithoutBody: HttpQueryFn<ApiResponse, ApiRequest>;

  @HttpDelete({
    path: '/api',
    postResponseProcessors: [PageResponseProcessor]
  }, () => ApiResponse)
  public deleteWithResponseProcessor: HttpBodyFn<ApiResponse, ApiRequest>;

  @HttpOption('/api', () => ApiResponse)
  public option: HttpQueryFn<ApiResponse>;

  @HttpOption('/api/:version', () => ApiResponse)
  public optionWithPathParam: HttpQueryFn<ApiResponse>;

  @HttpOption({
    path: '/api',
    withBody: true
  }, () => ApiResponse)
  public optionWithBody: HttpBodyFn<ApiResponse>;

  @HttpOption({
    path: '/api',
    postResponseProcessors: [PageResponseProcessor]
  }, () => ApiResponse)
  public optionWithResponseProcessor: HttpQueryFn<ApiResponse>;

}
```

In this example, ``ApiRequest`` and ``ApiResponse`` are typescript classes with an ``@Id()`` field and ``Column()``
fields :

```typescript
  class ApiResponse {

  @Id()
  public id: number;

  @Column()
  public column: string;

  @PathColumn()
  public version: string;

  public constructor(data: Partial<ApiResponse> = {}) {
    Object.assign(this, data);
  }
}

class ApiRequest {

  @Id()
  public identifier: number;

  @Column()
  public name: string;

  public constructor(data: Partial<ApiRequest> = {}) {
    Object.assign(this, data);
  }
}
```

Then, inject your ``Api`` like any other service and make requests by calling the previously defined methods.

### Event system

``NgxRepository`` comes with a custom event system. Events are published during a request lifecycle, and you can use
event listeners to add custom logic when these events are published.

```typescript
@Injectable()
@EventListener()
export class LogEventListener implements Listener<any> {

  public on(event: any): void {
    console.log(event);
  }
}
```

An event listener is a class decorated with ``@EventListener``. You can pass a predicate or an array of predicates to
the decorator to filter the events you want to listen to.

Here is the list of all events produced in ``NgxRepository`` :

| Event                                | Repository type       |
|--------------------------------------|-----------------------|
| `BeforeExecuteHttpRequestEvent`      | `HttpRepository`      |
| `BeforeHttpCreateEvent`              | `HttpRepository`      |
| `BeforeHttpDeleteEvent`              | `HttpRepository`      |
| `BeforeHttpFindAllEvent`             | `HttpRepository`      |
| `BeforeHttpFindByIdEvent`            | `HttpRepository`      |
| `BeforeHttpFindOneEvent`             | `HttpRepository`      |
| `BeforeHttpPatchEvent`               | `HttpRepository`      |
| `BeforeHttpUpdateEvent`              | `HttpRepository`      |
| `AfterHttpCreateEvent`               | `HttpRepository`      |
| `AfterHttpDeleteEvent`               | `HttpRepository`      |
| `AfterHttpFindAllEvent`              | `HttpRepository`      |
| `AfterHttpFindByIdEvent`             | `HttpRepository`      |
| `AfterHttpFindOneEvent`              | `HttpRepository`      |
| `AfterHttpPatchEvent`                | `HttpRepository`      |
| `AfterHttpUpdateEvent`               | `HttpRepository`      |
| `AfterExecuteHttpRequestEvent`       | `HttpRepository`      |
| `BeforeExecuteFirestoreRequestEvent` | `FirestoreRepository` |
| `BeforeFirestoreCreateEvent`         | `FirestoreRepository` |
| `BeforeFirestoreDeleteEvent`         | `FirestoreRepository` |
| `BeforeFirestoreFindAllEvent`        | `FirestoreRepository` |
| `BeforeFirestoreFindByIdEvent`       | `FirestoreRepository` |
| `BeforeFirestoreFindOneEvent`        | `FirestoreRepository` |
| `BeforeFirestorePatchEvent`          | `FirestoreRepository` |
| `BeforeFirestoreUpdateEvent`         | `FirestoreRepository` |
| `AfterFirestoreCreateEvent`          | `FirestoreRepository` |
| `AfterFirestoreDeleteEvent`          | `FirestoreRepository` |
| `AfterFirestoreFindAllEvent`         | `FirestoreRepository` |
| `AfterFirestoreFindByIdEvent`        | `FirestoreRepository` |
| `AfterFirestoreFindOneEvent`         | `FirestoreRepository` |
| `AfterFirestorePatchEvent`           | `FirestoreRepository` |
| `AfterFirestoreUpdateEvent`          | `FirestoreRepository` |
| `AfterExecuteFirestoreRequestEvent`  | `FirestoreRepository` |

## Test and debug

### NgxRepositoryTestingModule

You can easily test any service using ``NgxRepository`` using ``NgxRepositoryTestingModule`` like in the following
example :

```typescript
import { TestBed } from '@angular/core/testing';
import { MockRepository, NgxRepositoryTestingModule, Page } from '@paddls/ngx-repository';
import { LibraryService } from './library.service';
import { Library } from '../model/library.model';
import { HttpRepository } from '@paddls/ngx-http-repository';
import { LibraryQuery } from '../query/library.query';

describe('LibraryService', () => {
  let libraryService: LibraryService;
  let libraryRepository: MockRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxRepositoryTestingModule.forTest()
      ],
      providers: [
        LibraryService
      ]
    });

    libraryRepository = NgxRepositoryTestingModule.getRepository(Library, HttpRepository);
    libraryService = TestBed.get(LibraryService);
  });

  describe('#findAll', () => {
    it('should call findAll from read repository', (done: DoneFn) => {
      spyOn(libraryRepository, 'findAll').and.callThrough();

      libraryService.findAll(1, 5).subscribe((page: Page) => {
        expect(libraryRepository.findAll).toHaveBeenCalledWith(new LibraryQuery({
          opened: true,
          page: 1,
          itemPerPage: 5
        }));

        expect(page.length).toBe(0);

        done();
      });

      libraryRepository.emit('findAll', Page.build([]));
      expect(libraryRepository.findAll).toHaveBeenCalledWith(new LibraryQuery({
        opened: true,
        page: 1,
        itemPerPage: 5
      }));
    });
  });
});

```

### Enable debug mode

You can enable debug mode by setting ``debug`` flag to ``true`` in your repository module import config.

```typescript
@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    NgxRepositoryModule.forRoot(),
    NgxFirestoreRepositoryModule.forRoot({
      debug: true
    }),
    NgxHttpRepositoryModule.forRoot({
      debug: true
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Then, open your console to see debug messages for each request made.

## Install and build project

To install and build the project, you just have to clone the repository and make the dependency installation :

````shell script
npm i
````

After dependency installation, you can run others commands :

````shell script
# Run the tests
npm run test

# Run the linter
npm run lint

# Run the example app
npm run start
````

## Release

You should release from the master branch

````shell script
# create the release
npm run release --release=x.x.x
````

Then push
