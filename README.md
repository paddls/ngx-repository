# NGX-REPOSITORY

![ngx-repository-ci](https://github.com/witty-services/ngx-repository/workflows/build/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/witty-services/ngx-repository/badge.svg?branch=master)](https://coveralls.io/github/witty-services/ngx-repository?branch=master)
[![npm version](https://badge.fury.io/js/%40witty-services%2Fngx-repository.svg)](https://badge.fury.io/js/%40witty-services%2Fngx-repository)
![GitHub](https://img.shields.io/github/license/witty-services/ngx-repository)
![GitHub repo size](https://img.shields.io/github/repo-size/witty-services/ngx-repository)
![GitHub last commit](https://img.shields.io/github/last-commit/witty-services/ngx-repository)
![GitHub issues](https://img.shields.io/github/issues/witty-services/ngx-repository)
![GitHub top language](https://img.shields.io/github/languages/top/witty-services/ngx-repository)

NgxRepository is an Angular library to make a software DAO layer to access resource over some protocols

## Summary

* [How to install](#how-to-install)
    * [Main module](#main-module)
    * [Http Driver](#http-driver)
    * [Firebase Driver](#firebase-driver)
    * [Import Module](#import-module)
* [Basic usage](#basic-usage)
    * [Resource](#resource)
        * [HttpResource and FirebaseResource](#httpresource-and-firebaseresource)
        * [Id and Column](#id-and-column)
        * [JoinColumn](#joincolumn)
        * [SubCollection](#subcollection)
        * [PathColumn](#pathcolumn)
        * [Query](#query)
    * [Repository](#repository)
        * [Generated repository](#generated-repository)
        * [Custom repository](#custom-repository)
* [Advanced usage](#advanced-usage)
* [Install and build project](#install-and-build-project)


## How to install

### Main module

First install the main library in your project :

```shell script
npm install --save ngx-repository
```

After that, choose drivers and install them as follow.

### Http Driver

```shell script
npm install --save ngx-http-repository
```

### Firebase Driver

```shell script
npm install --save ngx-firebase-repository
```

### Import modules

First, import the ` NgxRepositoryModule` and its drivers : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository'; 
import {NgxHttpRepositoryModule} from '@witty-services/ngx-http-repository';
import {NgxFirebaseRepositoryModule} from '@witty-services/ngx-firebase-repository';

@NgModule({
    imports: [
        NgxRepositoryModule.forRoot(),
        NgxHttpRepositoryModule, // Http driver
        NgxFirebaseRepositoryModule.forRoot(
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
        ), // Firebase driver
    ]
})
export class AppModule {
}
```

## Basic usage

Define the model, the mapping, and the location of the resource. Then the system will build the corresponding repository.

### Resource

#### HttpResource and FirebaseResource

```typescript
import {FirebaseResource} from '@witty-services/ngx-firebase-repository';
import {HttpResource} from '@witty-services/ngx-http-repository';

// for Firebase
@FirebaseResource({
    path: '/users'
})
// or for Http
@HttpResource({
    path: '/api/users'
})
export class User {
    // ...
}
```

#### Id and Column

```typescript
import {FirebaseResource} from '@witty-services/ngx-firebase-repository';
import {HttpResource} from '@witty-services/ngx-http-repository';
import {Id, Column, DateConverter} from '@witty-services/ngx-repository';

// for Firebase
@FirebaseResource({
    path: '/users'
})
// or for Http
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

    @Column({ type: () => Job, field: 'job' }) // combine model and special mapping
    public myJob: Job;

    @Column({field: 'createdAt', customConverter: () => DateConverter}) // use custom converter for special type
    public createdAt: Date;

}
```

#### JoinColumn

You can fetch associated resources using ```JoinColumn```.

```typescript
import {HttpResource} from '@witty-services/ngx-http-repository';
import {Id, Column, JoinColumn} from '@witty-services/ngx-repository';
import {FirebaseRepository} from '@witty-services/ngx-firebase-repository';

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
    
    // initialize the request to get associated author, using instance attribute 'authorId' with User FirebaseRepository
    @JoinColumn({attribute: 'authorId', resourceType: () => User, repository: () => FirebaseRepository})
    public author$: Observable<Person>; // data will be lazy fetched on subscribe
}
```

#### SubCollection

You can fetch associated resources using ```SubCollection```.

```typescript
import {HttpResource, HttpRepository} from '@witty-services/ngx-http-repository';
import {Id, Column, SubCollection} from '@witty-services/ngx-repository';

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

#### PathColumn

```PathColumn``` allow you to fetch field from path request.

```typescript
import {HttpResource} from '@witty-services/ngx-http-repository';
import {Id, Column, PathColumn} from '@witty-services/ngx-repository';

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

```PathColumn``` is also useful when you write some resource, because valued ```PathColumn``` will be re-inject into the path request.

#### Query

To request data, you can provide Query object with annotated field.

```typescript
import {HttpQueryParam, HttpHeader} from '@witty-services/ngx-http-repository';
import {PathParam} from '@witty-services/ngx-repository';

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

### Repository

#### Generated Repository

Right, now you have your resources. NgxRepository will generate all repositories on demand. You just have to use repository in your services.

Each repository of a resource made from ```FirebaseDriver``` or ```HttpDriver``` are singleton services stored in Angular Injector.

```typescript
import {InjectRepository, Page} from '@witty-services/ngx-repository';
import {HttpRepository} from '@witty-services/ngx-http-repository'

@Injectable()
export class BookService {

    // repository is build with Http driver for User resource
    @InjectRepository({ resourceType: () => Book, repository: () => HttpRepository })
    private readonly bookRepository: HttpRepository<Book, number>;

    public findAllByLibraryId(libraryId: string): Observable<Page<User>> {
        return this.bookRepository.findAll(new BookQuery({
            libraryId
        }));
    }
}
```

#### Custom Repository

In specific case, you can define a custom repository like that :

```typescript
import {Repository} from '@witty-services/ng-repository';
import {HttpRepository} from '@witty-services/ng-http-repository';

@Injectable()
@Repository(() => Person)
export class PersonRepository extends HttpRepository<Person, string> {
    
    public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
        // write your custom logic here
    }
}

@Injectable()
export class PersonService {

  // Like a standard service, you can inject your custom repository
  public constructor(private readonly personRepository: PersonRepository) {}
}
```

## Advanced usage

You can override response transformation for each NgxRepository driver.

### HttpPageBuilder

In HttpDriver, you can override response which return some items by developing a page builder.

```typescript
import {Page} from '@witty-services/ngx-repository';
import {HttpPageBuilder, HttpRepository} from '@witty-services/ngx-http-repository';

@Injectable()
export class MyHttpPageBuilder implements HttpPageBuilder {

    public buildPage(response$: Observable<HttpResponse<any>>, repository: HttpRepository<any, any>): Observable<Page<any>> {
        return response$.pipe(
            map((response: HttpResponse<any>) => {
                const page: Page<any> = new Page<any>(response.body);

                page.totalItems = ... ; // get total items from response;
                page.itemsPerPage = ... ; // get item per page from response;
                page.currentPage = ... ; // get current page from response;

                return page;
            })
        );
    }
}
```

And to use your new builder, you just have to provide a service behind a specific token with your class : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
import {NgxHttpRepositoryModule, HTTP_PAGE_BUILDER_TOKEN} from '@witty-services/ngx-http-repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxRepositoryModule.forRoot(),
    NgxHttpRepositoryModule
  ],
  providers: [
    {
      provide: HTTP_PAGE_BUILDER_TOKEN,
      useClass: MyHttpPageBuilder
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### HttpCreateResponseBuilder

In HttpDriver, you can override response which return the result of creation request. By defaultn NgxHttpRepository search id in http response body. But you can override this behavior to find id in other place.

```typescript
import {HttpResponseBuilder, HttpRepository} from '@witty-services/ngx-http-repository';

@Injectable()
export class MyHttpCreateResponseBuilder implements HttpResponseBuilder {

    public buildPage(response$: Observable<HttpResponse<any>>, repository: HttpRepository<any, any>): Observable<any> {
        return response$.pipe(
            map((response: HttpResponse<any>) => response.headers.get('some-header'))
        );
    }
}
```

And to use your new builder, you just have to provide a service behind a specific token with your class : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
import {NgxHttpRepositoryModule, HTTP_CREATE_RESPONSE_BUILDER} from '@witty-services/ngx-http-repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxRepositoryModule.forRoot(),
    NgxHttpRepositoryModule
  ],
  providers: [
    {
      provide: HTTP_CREATE_RESPONSE_BUILDER,
      useClass: MyHttpCreateResponseBuilder
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### HttpFindOneResponseBuilder

In HttpDriver, you can override response which return just one result.

```typescript
import {HttpResponseBuilder, HttpRepository} from '@witty-services/ngx-http-repository';

@Injectable()
export class MyHttpFindOneResponseBuilder implements HttpResponseBuilder {

    public buildPage(response$: Observable<HttpResponse<any>>, repository: HttpRepository<any, any>): Observable<any> {
        return response$.pipe(
              map((response: HttpResponse<any>) => response.body)
        );
    }
}
```

And to use your new builder, you just have to provide a service behind a specific token with your class : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
import {NgxHttpRepositoryModule, HTTP_FIND_ONE_RESPONSE_BUILDER} from '@witty-services/ngx-http-repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxRepositoryModule.forRoot(),
    NgxHttpRepositoryModule
  ],
  providers: [
    {
      provide: HTTP_FIND_ONE_RESPONSE_BUILDER,
      useClass: MyHttpFindOneResponseBuilder
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### FirebasePageBuilder

In FirebaseDriver, you can override response which return some items by developing a page builder.

```typescript
import {Page} from '@witty-services/ngx-repository';
import {FirebasePageBuilder, FirebaseRepository} from '@witty-services/ngx-firebase-repository';

@Injectable()
export class MyFirebasePageBuilder implements FirebasePageBuilder {

    public buildPage(response$: Observable<QuerySnapshot<DocumentData>>, repository: FirebaseRepository<any, any>): Observable<Page<any>> {
        return response$.pipe(
            map((qs: QuerySnapshot<DocumentData>) => {
                const page: Page<any> = new Page<any>(qs.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                  id: doc.id,
                  ...doc.data()
                })));

                page.totalItems = ... ; // get total items from response;
                page.itemsPerPage = ... ; // get item per page from response;
                page.currentPage = ... ; // get current page from response;

                return page;
            })
        );
    }
}
```

And to use your new builder, you just have to provide a service behind a specific token with your class : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
import {NgxFirebaseRepositoryModule, FIREBASE_PAGE_BUILDER_TOKEN} from '@witty-services/ngx-firebase-repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxRepositoryModule.forRoot(),
    NgxFirebaseRepositoryModule.forRoot()
  ],
  providers: [
    {
      provide: FIREBASE_PAGE_BUILDER_TOKEN,
      useClass: MyFirebasePageBuilder
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### FirebaseCreateResponseBuilder

In FirebaseDriver, you can override response which return the result of creation request.

```typescript
import {FirebaseResponseBuilder, FirebaseRepository} from '@witty-services/ngx-firebase-repository';

@Injectable()
export class MyFirebaseCreateResponseBuilder implements FirebaseResponseBuilder {

    public buildPage(response$: Observable<DocumentReference<DocumentData>>, repository: FirebaseRepository<any, any>): Observable<any> {
        return response$.pipe(
            map((documentReference: DocumentReference<DocumentData>) => documentReference.id)
        );
    }
}
```

And to use your new builder, you just have to provide a service behind a specific token with your class : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
import {NgxFirebaseRepositoryModule, FIREBASE_CREATE_RESPONSE_BUILDER} from '@witty-services/ngx-firebase-repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxRepositoryModule.forRoot(),
    NgxFirebaseRepositoryModule.forRoot()
  ],
  providers: [
    {
      provide: FIREBASE_CREATE_RESPONSE_BUILDER,
      useClass: MyFirebaseCreateResponseBuilder
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### FirebaseFindOneResponseBuilder

In FirebaseDriver, you can override response which return just one result.

```typescript
import {FirebaseResponseBuilder, FirebaseRepository} from '@witty-services/ngx-firebase-repository';

@Injectable()
export class MyFirebaseFindOneResponseBuilder implements FirebaseResponseBuilder {

    public buildPage(response$: Observable<DocumentSnapshot>, repository: FirebaseRepository<any, any>): Observable<any> {
        return response$.pipe(
            map((documentReference: DocumentSnapshot) => documentReference.id)
        );
    }
}
```

And to use your new builder, you just have to provide a service behind a specific token with your class : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
import {NgxFirebaseRepositoryModule, FIREBASE_FIND_ONE_RESPONSE_BUILDER} from '@witty-services/ngx-firebase-repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxRepositoryModule.forRoot(),
    NgxFirebaseRepositoryModule.forRoot()
  ],
  providers: [
    {
      provide: FIREBASE_FIND_ONE_RESPONSE_BUILDER,
      useClass: MyFirebaseFindOneResponseBuilder
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

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
