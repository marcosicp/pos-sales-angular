import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(updates: SwUpdate){
    debugger;
    if (updates && updates.isEnabled) {
      updates.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        if (confirm('New version of admin available. Load New Version?')) {
          updates.activateUpdate().then(() => window.location.reload());
        }
      });
    }
  }


}
