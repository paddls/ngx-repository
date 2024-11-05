import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  public createDb(): { libraries: any[], persons: any[], books: any[], comments: any[] } {
    return {
      libraries: this.makeLibraries(),
      persons: this.makePersons(),
      books: this.makeBooks(),
      comments: this.makeComments()
    };
  }

  private makeLibraries(): any[] {
    return [
      {
        id: '1',
        name: 'Library 1',
        description: 'Description library 1',
        address: {
          address: '1 rue de la république',
          postCode: 35000,
          city: 'Roazhon'
        },
        opened: true
      },
      {
        id: '2',
        name: 'Library 2',
        description: 'Description library 2',
        test: 'coucou',
        createdAt: new Date('Wed, 09 Aug 1995 00:00:00 GMT'),
        address: {
          address: '2 rue de la république',
          postCode: 35000,
          city: 'Roazhon'
        },
        opened: true
      },
      {
        id: '3',
        name: 'Library 3',
        description: null,
        createdAt: new Date('Wed, 10 Sep 1990 00:00:00 GMT'),
        address: {
          address: '3 rue de la république',
          postCode: 35000,
          city: 'Roazhon'
        },
        opened: true
      },
      {
        id: '4',
        name: 'Library 4',
        createdAt: new Date('Wed, 10 Sep 1990 00:00:00 GMT'),
        address: null,
        opened: false
      }
    ];
  }

  private makePersons(): any[] {
    return [
      {
        id: '1',
        firstName: 'Thomas',
        lastName: 'Nisole'
      },
      {
        id: '2',
        firstName: 'Romain',
        lastName: 'Martineau'
      },
      {
        id: '3',
        firstName: 'Corentin',
        lastName: 'Langlais'
      },
      {
        id: '4',
        firstName: 'Guillaume',
        lastName: 'Goeffic'
      },
      {
        id: '5',
        firstName: 'Valentin',
        lastName: 'Clenet'
      }
    ];
  }

  private makeBooks(): any[] {
    return [
      {
        id: '1',
        library: '1',
        title: 'Le premier livre',
        author: '1',
        editor: {
          id: '4'
        },
        revision: 'rev1'
      },
      {
        id: '2',
        library: '1',
        title: 'Le deuxieme livre',
        author: '1',
        editor: {
          id: '5'
        },
        revision: 'rev1.1'
      },
      {
        id: '3',
        library: '2',
        title: 'Le troisième livre',
        author: '2',
        editor: {
          id: '4'
        },
        revision: 'rev1.2'
      },
      {
        id: '4',
        library: '2',
        title: 'Le quatrième livre',
        author: '2',
        editor: {
          id: '2'
        },
        revision: 'rev1.2'
      }
    ];
  }

  private makeComments(): any[] {
    return [
      {
        id: 'comment1_1',
        message: 'Commentaire 1 du livre 1',
        author: '5',
        book: '1'
      },
      {
        id: 'comment1_2',
        message: 'Commentaire 2 du livre 1',
        author: '2',
        book: '1'
      },
      {
        id: 'comment2_1',
        message: 'Commentaire 1 du livre 2',
        author: '4',
        book: '2'
      },
      {
        id: 'comment3_1',
        message: 'Commentaire 1 du livre 3',
        author: '5',
        book: '3'
      },
      {
        id: 'comment3_2',
        message: 'Commentaire 2 du livre 3',
        author: '1',
        book: '3'
      }
    ];
  }
}
