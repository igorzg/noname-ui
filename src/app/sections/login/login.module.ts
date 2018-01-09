import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";
import {LoggedInGuard} from "./logged-in-guardian";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LogoutComponent} from "./logout.component";
import {environment} from "../../../environments/environment";


@NgModule({
  declarations: [
    LoginComponent, LogoutComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: environment.routing.UI.LOGIN.slice(1),
        canActivate: [LoggedInGuard],
        component: LoginComponent
      },
      {
        path: environment.routing.UI.LOGOUT.slice(1),
        component: LogoutComponent
      }
    ])
  ],
  providers: [LoggedInGuard]
})
export class LoginModule{}
