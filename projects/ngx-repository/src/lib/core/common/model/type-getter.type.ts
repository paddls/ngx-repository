import { Type } from '@angular/core';

export type TypeGetter<T = any> = () => Type<T>;
