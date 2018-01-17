import {NgModule} from "@angular/core";
import {UsersFromComponent} from "./modules/user-form/users-form.component";
import {UsersListComponent} from "./modules/user-list/users-list.component";
import {UsersService} from "./services/users.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {PermissionsService} from "./services/permissions.service";
import {PermissionsListComponent} from "./modules/permissions-list/permissions-list.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "add",
        component: UsersFromComponent
      },
      {
        path: "edit/:id",
        component: UsersFromComponent
      },
      {
        path: "permissions",
        component: PermissionsListComponent
      },
      {
        path: "",
        component: UsersListComponent
      }
    ])
  ],
  declarations: [UsersListComponent, PermissionsListComponent, UsersFromComponent],
  providers: [UsersService, PermissionsService]
})
export class UsersModule {
}
