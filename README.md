# Ngx-Repository

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

* [Installation](#installation)
* [How to use](#how-to-use)
    * [Overview](#overview)
    * [Import module](#import-module)
    * [Create resource](#create-resource)
    * [Add identifier](#add-identifier)
    * [Add columns](#add-columns)
    * [Add nested resource](#add-nested-resource)
    * [Add sub collection of resource](#add-sub-collection-of-resource)
    * [Inject connection in your service](#inject-connection-in-your-service)
    * [Inject repository in your service](#inejct-repository-in-your-service)
    * [Make custom repository](#make-custom-repository)
* [API](#api)
    * [Decorators](#decorators)
    * [Connections](#connections)
    * [Repositories](#repositories)
* [How to contribute](#how-to-contribute)
    * [Install and build project](#install-and-build-project)


## Installation

For installing the library in your Angular with NPM, just run this command :

```shell script
npm i ngx-repository
```

## How to use

### Overview

With Ngx-Repository, your models look like this :

```typescript
import {User} from './user.model';
import {Comment} from './comment.model';
import {CommentQuery} from '../query/comment.query';
import {HttpResource, Id, Column, JoinColumn, SubCollection} from 'ngx-repository';
import {Observable} from 'rxjs';

@HttpResource({
  path: '/books'
})
export class Book {

  @Id()
  public id: string;
  
  @Column()
  public title: string;
  
  @Column(User)
  public author: User;

  @Column('status')
  public published: boolean;

  @Column({field: 'editor.id'})
  public editorId: string;

  @JoinColumn({attribute: 'editorId', resourceType: User})
  public editor$: Observable<User>;
  
  @SubCollection({resourceType: Comment, params: (book: Book) => new CommentQuery({bookId: book.id})})
  public comments$: Observable<Comment[]>;
}
```

And your business code look like this :

```typescript
import {Injectable} from '@angular/core';
import {Book} from '../model/book.model';
import {Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {BookQuery} from '../query/book.query';
import {HttpConnection, HttpRepository, InjectRepository, Page} from 'ngx-repository';

@Injectable()
export class BookService {

  @InjectRepository({type: Book, connection: HttpConnection})
  private bookRepository: HttpRepository<Book, string>;

  public findAll(): Observable<Page<Book>> {
    return this.bookRepository.findBy(new BookQuery({
      published: true
    }));
  }

  public findById(id: string): Observable<Book> {
    return this.bookRepository.findOne(id);
  }

  public update(library: Book): Observable<Book> {
    return this.bookRepository.update(library).pipe(
      mapTo(library)
    );
  }

  public delete(library: Book): Observable<void> {
    return this.bookRepository.delete(library).pipe(
      mapTo(void 0)
    );
  }
}
```


### Import module

The first step is to import the ` NgxRepository` module : 

```typescript
// ...
import {NgxRepositoryModule} from 'ngx-repository';
// ...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxRepositoryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Create resource

First of all, you must have to create a class model which will then be set up with some decorators to describe how to denormalize data receive from a server.

```typescript
import {User} from './user.model';
import {Comment} from './comment.model';

export class Book {

  public id: string;
  
  public title: string;
  
  public author: User;

  public editor: User;

  public comments: Comment[];
}
```

#### Id decorator

#### Column decorator

#### JoinColumn decorator

#### SubCollection decorator


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
