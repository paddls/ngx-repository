# Ngx-Repository

![ngx-repository-ci](https://github.com/witty-services/ngx-repository/workflows/build/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/witty-services/ngx-repository/badge.svg?branch=master)](https://coveralls.io/github/witty-services/ngx-repository?branch=master)
[![npm version](https://badge.fury.io/js/%40witty-services%2Fngx-repository.svg)](https://badge.fury.io/js/%40witty-services%2Fngx-repository)
![GitHub](https://img.shields.io/github/license/witty-services/ngx-repository)
![GitHub repo size](https://img.shields.io/github/repo-size/witty-services/ngx-repository)
![GitHub last commit](https://img.shields.io/github/last-commit/witty-services/ngx-repository)
![GitHub issues](https://img.shields.io/github/issues/witty-services/ngx-repository)
![GitHub top language](https://img.shields.io/github/languages/top/witty-services/ngx-repository)

## Introduction

NgxRepository is an Angular library that will allow you to simplify your application's access to server resources.

At this time, NgxRepository support differents kinds of serveur : 

 - Http server : based on the Angular [HttpClientModule](https://angular.io/guide/http)
 - Firebase server : based on npm [```@angular/fire```](https://www.npmjs.com/package/@angular/fire) library 

## Summary

* [Installation](#installation)
* [How to use](#how-to-use)
    * [Overview](#overview)
    * [Import module](#import-module)
    * [Create resource](#create-resource)
    * [Add identifier](#add-identifier)
    * [Add columns](#add-columns)
    * [Add nested resource](#add-nested-resource)
    * [Add sub-collection of resource](#add-sub-collection-of-resource)
    * [Inject connection](#inject-connection)
    * [Inject repository](#inejct-repository)
    * [Make custom repository](#make-custom-repository)
* [API](#api)
    * [Decorators](#decorators)
    * [Connections](#connections)
    * [Repositories](#repositories)
* [How to contribute](#how-to-contribute)
    * [Install and build project](#install-and-build-project)


## Installation

For installing the library in your Angular application with NPM, just run this command :

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
import {HttpResource, Id, Column, JoinColumn, SubCollection} from '@witty-services/ngx-repository';
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

To make a request, you must have to make a query object :

```typescript
import {HttpQueryParam} from '@witty-services/ngx-repository';

export class BookQuery {

  @HttpQueryParam()
  public published: boolean;

  public constructor(data: Partial<BookQuery> = {}) {
    Object.assign(this, data);
  }
}
```

And use it in your business code like this :

```typescript
import {Injectable} from '@angular/core';
import {Book} from '../model/book.model';
import {Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {BookQuery} from '../query/book.query';
import {HttpConnection, HttpRepository, InjectRepository, Page} from '@witty-services/ngx-repository';

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

  public update(book: Book): Observable<Book> {
    return this.bookRepository.update(book).pipe(
      mapTo(book)
    );
  }

  public delete(book: Book): Observable<void> {
    return this.bookRepository.delete(book).pipe(
      mapTo(void 0)
    );
  }
}
```

### Import module

The first step to use `NgxRepository` is to import `NgxRepositoryModule` and calling `forRoot` method : 

```typescript
// ...
import {NgxRepositoryModule} from '@witty-services/ngx-repository';
// ...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxRepositoryModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Create resource

First of all, you must have to create a class model which will then be set up with some decorators to describe how to denormalize data receive from a server.
All connection type come with theirs own resource type decorator. For example, ```HttpConnection``` come with ```HttpResource``` decorator :

```typescript
import {User} from './user.model';
import {HttpResource} from '@witty-services/ngx-repository';

@HttpResource({
  path: '/books'
})
export class Book {

  public id: string;
  
  public title: string;
  
  public author: User;

  public published: boolean;

  public editorId: string;
}
```

### Add identifier

Once you have created your resource, you can add the column identifier decorator :

```typescript
import {User} from './user.model';
import {HttpResource, Id} from '@witty-services/ngx-repository';

@HttpResource({
  path: '/books'
})
export class Book {

  @Id()
  public id: string;
  
  public title: string;
  
  public author: User;

  public published: boolean;

  public editorId: string;
}
```

```NgxRepository``` use this decorator to retrieve object id to construct the request for update and delete object from the server.

### Add columns

After identifier column, you can add much simple column like this :

```typescript
import {User} from './user.model';
import {HttpResource, Id, Column} from '@witty-services/ngx-repository';

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
}
```

This decorator is used by NgxRepository to normalize your object before sending to the server and to denormalize your object when you retrieve data from the server.
For more information about the decorator configuration, please see the [Column decorator API reference](#decorators)

### Add nested resource

Now, imagine you want to add an ```attribute``` in your ```Book``` resource which represent the editor based on ```editorId``` attribute. Normaly you have to make a request in your component to retrieve your data. But with ```NgxRepository```, you have to just add a decorator :

```typescript
import {User} from './user.model';
import {HttpResource, Id, Column, JoinColumn} from '@witty-services/ngx-repository';
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
}
```

Now, you just have to use, for example, the ```async``` pipe to retrieve data in your component template.

### Add sub-collection of resource

### Inject connection

### Inject repository

### Make custom repository

## API

### Decorators

### Connections

### Repositories

## How to contribute

### Install and build project

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
