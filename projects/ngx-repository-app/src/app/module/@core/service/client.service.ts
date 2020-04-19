import { Injectable } from '@angular/core';
import { Library } from '../model/library.model';
import { Observable } from 'rxjs';
import { FirebaseConnection, FirebaseRepository, InjectRepository, Page } from '@witty-services/ngx-repository';
import { Client } from '../model/client.model';

@Injectable()
export class ClientService {

  @InjectRepository({type: Client, connection: FirebaseConnection})
  private repository: FirebaseRepository<Client, string>;

  public findAll(currentPage: number, itemPerPage: number): Observable<Page<Client>> {
    return this.repository.findBy();
  }

  // public findById(id: string): Observable<Library> {
  //   return this.readLibraryRepository.findOne(id);
  // }
  //
  // public update(library: Library): Observable<Library> {
  //   return this.writeLibraryRepository.update(library).pipe(
  //     mapTo(library)
  //   );
  // }
  //
  // public delete(library: Library): Observable<void> {
  //   return this.writeLibraryRepository.delete(library).pipe(
  //     mapTo(void 0)
  //   );
  // }
}
