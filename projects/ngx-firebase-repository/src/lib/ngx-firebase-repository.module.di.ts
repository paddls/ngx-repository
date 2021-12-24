import { InjectionToken } from '@angular/core';
import { Firestore } from 'firebase/firestore';

/** @ignore */
export const FIRESTORE_APP: InjectionToken<Firestore> = new InjectionToken<Firestore>('FIRESTORE_APP');
