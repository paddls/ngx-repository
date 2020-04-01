import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LibrariesComponent} from './component/libraries/libraries.component';
import {LibraryComponent} from './component/library/library.component';

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
        path: ':libraryId',
        component: LibraryComponent
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
