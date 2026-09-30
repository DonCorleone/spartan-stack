import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'spartan-stack-home',
  
  imports: [AnalogWelcomeComponent],
  template: `
     <spartan-stack-analog-welcome/>
  `,
})
export default class HomeComponent {
}
