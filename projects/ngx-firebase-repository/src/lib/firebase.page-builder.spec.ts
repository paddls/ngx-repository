import {of} from 'rxjs';
import {Page} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import {FirebaseNoPageBuilder} from './firebase-no.page-builder';

describe('FirebasePageBuilder', () => {

  it('should return a simple page without any informations of page', (done: DoneFn) => {
    const builder: FirebaseNoPageBuilder = new FirebaseNoPageBuilder();
    const querySnapshot: QuerySnapshot<DocumentData> = {
      docs: [
        {id: '1', data: () => void 0} as QueryDocumentSnapshot<DocumentData>,
        {id: '2', data: () => void 0} as QueryDocumentSnapshot<DocumentData>,
        {id: '3', data: () => void 0} as QueryDocumentSnapshot<DocumentData>
      ] as QueryDocumentSnapshot<DocumentData>[]
    } as QuerySnapshot<DocumentData>;

    builder.buildPage(of(querySnapshot)).subscribe({
      next: (page: Page<any>) => {
        expect(page).toEqual([
          {id: '1'},
          {id: '2'},
          {id: '3'}
        ]);
        expect(page.currentPage).toBeUndefined();
        expect(page.itemsPerPage).toBeUndefined();
        expect(page.totalItems).toBeUndefined();
      },
      complete: () => done()
    });
  });
});
