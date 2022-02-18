import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  OrderByDirection,
  WhereFilterOp
} from 'firebase/firestore';
import { FieldPath, Query, QueryConstraint, SnapshotListenOptions, Unsubscribe } from '@firebase/firestore';
import { Observer, of } from 'rxjs';
import { FirestoreMock } from 'projects/ngx-firestore-repository/src/e2e/util/firestore-mock.spec';
import { wif } from '@paddls/rxjs-common';
import { map } from 'rxjs/operators';

export function collection(firestore: Firestore, path: string): CollectionReference<DocumentData> {
  return {
    type: 'collection',
    path
  } as any;
}

export function doc(firestore: Firestore, path: string): DocumentReference<DocumentData> {
  return {
    type: 'document',
    path
  } as any;
}

export const addDoc: any = jasmine.createSpy().and.callFake((c: { path: string }) => {
  return FirestoreMock.get(c.path).pipe(
    map((data: any) => data)
  ).toPromise();
});

export const updateDoc: any = jasmine.createSpy().and.returnValue(of(void 0).toPromise());

export const setDoc: any = jasmine.createSpy().and.returnValue(of(void 0).toPromise());

export const deleteDoc: any = jasmine.createSpy().and.returnValue(of(void 0).toPromise());

export const query: any = jasmine.createSpy().and.callFake((query: Query<any>) => ({
  type: (query as any).type,
  path: (query as any).path
} as any));

export function onSnapshot(reference: any,
                           options: SnapshotListenOptions,
                           observer: Observer<any>): Unsubscribe {
  return FirestoreMock.get(reference.path)
    .pipe(
      wif(
        () => reference.type === 'collection',
        (items: any[]) => ({
          docs: items.map((data: any) => ({data: () => data}))
        }),
        (data: any[]) => ({
          data: () => data
        })
      ),
    )
    .subscribe(observer)
    .unsubscribe;
}

export function where(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown): QueryConstraint {
  return {
    type: 'where',
    data: {fieldPath, opStr, value}
  } as any;
}

export function orderBy(fieldPath: string | FieldPath, directionStr?: OrderByDirection): QueryConstraint {
  return {
    type: 'orderBy',
    data: {fieldPath, directionStr}
  } as any;
}

export function startAt(...fieldValues: unknown[]): QueryConstraint {
  return {
    type: 'startAt',
    data: {fieldValues}
  } as any;
}

export function startAfter(...fieldValues: unknown[]): QueryConstraint {
  return {
    type: 'startAfter',
    data: {fieldValues}
  } as any;
}

export function endAt(...fieldValues: unknown[]): QueryConstraint {
  return {
    type: 'endAt',
    data: {fieldValues}
  } as any;
}

export function endBefore(...fieldValues: unknown[]): QueryConstraint {
  return {
    type: 'endBefore',
    data: {fieldValues}
  } as any;
}

export function limit(limit: number): QueryConstraint {
  return {
    type: 'limit',
    data: {limit}
  } as any;
}

export function limitToLast(limit: number): QueryConstraint {
  return {
    type: 'limitToLast',
    data: {limit}
  } as any;
}
