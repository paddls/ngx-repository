import { Predicate, Type } from '@angular/core';

import { EventListener, TypeGetter } from '@paddls/ngx-repository';
import { HTTP_WRITE_OPERATIONS, HttpWriteOperation } from '../request/http.operation';
import { AfterHttpCreateEvent } from '../repository/event/after-http-create.event';
import { AfterHttpUpdateEvent } from '../repository/event/after-http-update.event';
import { AfterHttpPatchEvent } from '../repository/event/after-http-patch.event';
import { AfterHttpDeleteEvent } from '../repository/event/after-http-delete.event';
import { isFunction } from '../utils/is-function';
import { isObject } from '../utils/is-object';
import { flatten } from '../utils/flatten';
import { valuesIn } from '../utils/values-in';
import { pick } from '../utils/pick';

const eventMapping: { [key: string]: any } = {
  write: [
    AfterHttpCreateEvent,
    AfterHttpUpdateEvent,
    AfterHttpPatchEvent,
    AfterHttpDeleteEvent
  ],
  create: [AfterHttpCreateEvent],
  udpate: [AfterHttpUpdateEvent],
  delete: [AfterHttpDeleteEvent]
};

export interface OnHttpResourceChangeContext<T> {

  type: TypeGetter<T>;

  actions?: HttpWriteOperation[];
}

export function OnHttpResourceChange<T>(context: OnHttpResourceChangeContext<T> | TypeGetter<T> | Predicate<any> | (Predicate<any>[])): any {
  return (target: any, propertyKey: string): any => {
    if (isFunction(context) || Array.isArray(context)) {
      EventListener(context as Predicate<any> | (Predicate<any>[]))(target, propertyKey);

      return;
    }

    let finalContext: OnHttpResourceChangeContext<T> = {
      actions: HTTP_WRITE_OPERATIONS,
      type: null
    };

    if (isObject(context)) {
      finalContext = {
        ...finalContext,
        ...context
      };
    } else {
      finalContext.type = context as TypeGetter<T>;
    }

    EventListener((event: { type: Type<any> }) => {
      if (event.type !== finalContext.type()) {
        return false;
      }

      if (!finalContext.actions) {
        return true;
      }

      return flatten(valuesIn(pick(eventMapping, finalContext.actions))).some((v: any) => event instanceof v);
    })(target, propertyKey);
  };
}
