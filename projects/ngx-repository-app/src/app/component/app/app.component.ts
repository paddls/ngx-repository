import { Component, inject } from '@angular/core';
import { NgxSerializerService } from '@paddls/ngx-repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  service = inject(NgxSerializerService);

  constructor() {
    console.log(this.service);
  }
}
