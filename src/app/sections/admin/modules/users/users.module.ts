import {NgModule} from "@angular/core";
import {UsersFromComponent} from "./modules/user-form/users-form.component";
import {UsersListComponent} from "./modules/user-list/users-list.component";
import {UsersService} from "./services/users.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {PermissionsService} from "./services/permissions.service";
import {PermissionsListComponent} from "./modules/permissions-list/permissions-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderResolver} from "../../services/loader-resolver";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "add",
        component: UsersFromComponent,
        resolve: {
          delay: LoaderResolver
        }
      },
      {
        path: "edit/:id",
        component: UsersFromComponent
      },
      {
        path: "permissions",
        component: PermissionsListComponent,
        resolve: {
          delay: LoaderResolver
        }
      },
      {
        path: "",
        component: UsersListComponent,
        resolve: {
          delay: LoaderResolver
        }
      }
    ])
  ],
  declarations: [UsersListComponent, PermissionsListComponent, UsersFromComponent],
  providers: [ UsersService, PermissionsService]
})
export class UsersModule {
}

