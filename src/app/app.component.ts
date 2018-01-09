import {Component, ElementRef} from '@angular/core';
import {Authentication, AuthStatus} from "./services/authentication.service";

@Component({
  selector: '[app-root]',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(el: ElementRef, authentication: Authentication) {
    el.nativeElement.classList.add("login");
    authentication.onAuthChange(data => {
      if (AuthStatus.LOGGED_IN === data) {
        el.nativeElement.classList.remove("login");
      } else if (AuthStatus.LOGOUT === data) {
        el.nativeElement.classList.add("login");
      }
    })
  }
}
