import { NgxRepositoryService } from '../../ngx-repository.service';
import { inject } from '@angular/core';
import { InjectRepositoryContext } from '../configuration/context/inject-repository-context.configuration';

export function injectRepository<T>(params: InjectRepositoryContext<T>): any {
  return inject(NgxRepositoryService).getRepository(params.resourceType(), params.repository());
}
