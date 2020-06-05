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

* [Installation](#how-to-install)
    * [Import module](#import-module)
    * [Http Driver](#http-driver)
    * [Firebase Driver](#firebase-driver)
* [How to use](#how-to-use)
* [Install and build project](#install-and-build-project)


## How to install

First install the library in your project :

```shell script
npm install --save ngx-repository
```

Then install the corresponding driver :

### Http Driver
```shell script
npm install --save ngx-http-repository
```

### Firebase Driver

```shell script
npm install --save ngx-firebase-repository
```

### Import module

First, import the ` NgxRepositoryModule` and it's driver : 

```typescript
import {NgxRepositoryModule} from '@witty-services/ngx-repository'; 
import {NgxHttpRepositoryModule} from '@witty-services/ngx-http-repository';
import {NgxFirebaseRepositoryModule} from '@witty-services/ngx-firebase-repository';

@NgModule({
    imports: [
        NgxRepositoryModule.forRoot(),
        NgxHttpRepositoryModule, // Http driver
        NgxFirebaseRepositoryModule.forRoot(), // Firebase driver
    ]
})
export class AppModule {
}
```

#### HttpRepository

Define the strategy for page building

```typescript
@Injectable()
export class PageBuilderService implements PageBuilder<HttpResponse<any>> {

    public buildPage(response$: Observable<HttpResponse<any>>, repository: HttpRepository<any, any>): Observable<Page<any>> {
        return response$.pipe(
            map((response: HttpResponse<any>) => {
                const page: Page<any> = new Page<any>(response.body);

                page.totalItems =; ... // get total items from response;
                page.itemsPerPage =; ... // get item per page from response;
                page.currentPage =; ... // get current page from response;

                return page;
            })
        );
    }
}
```

then provide it inside AppModule as HTTP_PAGE_BUILDER_TOKEN
```typescript
@NgModule({
    providers: [
        {
            provide: HTTP_PAGE_BUILDER_TOKEN,
            useClass: PageBuilderService
        },
    ]
})
export class AppModule {
}
```

#### FirebaseRepository

```typescript
export function createFirestore(): Firestore {
  return firebase.initializeApp({
    apiKey: 'TODO',
    authDomain: 'TODO',
    databaseURL: 'TODO',
    projectId: 'TODO',
    storageBucket: 'TODO',
    messagingSenderId: 'TODO',
    appId: 'TODO',
    measurementId: 'TODO'
  }).firestore();
}

@NgModule({
    // ...
    providers: [
        {
           provide: FIRESTORE_APP,
           useFactory: createFirestore
        },
        // ...
    ]
    // ...
})
export class AppModule {
}
```

## How to use

### Ressource

Define the model, the mapping, and the location of the resource. Then the system will build the corresponding repository.

```typescript
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

### JoinColumn

You can fetch associated resource using JoinColumn.

```typescript
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

### SubCollection

You can fetch associated resources using SubCollection.

```typescript
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

### PathColumn

PathColumn allow you to fetch field from path request.

```typescript
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

### Query

To request data, you can provide Query object with annotated field.

```typescript
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

```typescript
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

```typescript
@Injectable()
@Repository(() => Person)
export class PersonRepository extends HttpRepository<Person, string> {
    
    public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
        // write your custom logic here
    }
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
