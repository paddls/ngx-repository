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

* [Installation](#installation)
* [How to use](#how-to-use)
    * [Import module](#import-module)
* [Install and build project](#install-and-build-project)


## Installation

For installing the library in your Angular with NPM, just run this command :

```shell script
npm i ngx-repository
```

## How to use

### Import module

The first step is to import the ` NgxRepository` module : 

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
    NgxRepositoryModule
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
