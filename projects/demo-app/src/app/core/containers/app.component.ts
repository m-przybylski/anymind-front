import { Component } from '@angular/core';

@Component({
  selector: 'test-app',
  template: `
    <ul>
      <li [routerLink]="['/buttons']">buttons</li>
      <li [routerLink]="['/footers']">footers</li>
      <li [routerLink]="['/profile-link']">profile-link</li>
    </ul>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
