#NGX-REPOSITORY

NgxRepository is an Angular library to make a software DAO layer to access resource over some protocols

## Summary

* [Installation](#installation)
* [How to use](#how-to-use)
    * [Import module](#import-module)
* [Clone and install project](#clone-and-install-project)


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
