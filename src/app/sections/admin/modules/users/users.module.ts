import {NgModule} from "@angular/core";
import {UsersAddComponent} from "./modules/user-add/users-add.component";
import {UsersListComponent} from "./modules/user-list/users-list.component";
import {UsersService} from "./services/users.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {PermissionsService} from "./services/permissions.service";
import {PermissionsListComponent} from "./modules/permissions-list/permissions-list.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "add",
        component: UsersAddComponent
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
  declarations: [UsersListComponent, PermissionsListComponent, UsersAddComponent],
  providers: [UsersService, PermissionsService]
})
export class UsersModule {
}
