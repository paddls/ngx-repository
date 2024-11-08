import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariesComponent } from './component/libraries/libraries.component';
import { LibraryComponent } from './component/library/library.component';
import { ClientComponent } from './component/client/client.component';
import { PersonComponent } from './component/person/person.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'libraries',
    pathMatch: 'full'
  },
  {
    path: 'libraries',
    component: LibrariesComponent,
    children: [
      {
        path: 'clients/:clientId',
        component: ClientComponent
      },
      {
        path: ':libraryId',
        component: LibraryComponent
      },
      {
        path: 'persons/:personId',
        component: PersonComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
