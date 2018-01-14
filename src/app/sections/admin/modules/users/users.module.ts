import {NgModule} from "@angular/core";
import {UsersAddComponent} from "./add/users-add.component";
import {UsersListComponent} from "./list/users-list.component";
import {UsersService} from "./services/users.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "add",
        component: UsersAddComponent
      },
      {
        path: "",
        component: UsersListComponent
      }
    ])
  ],
  declarations: [UsersListComponent, UsersAddComponent],
  providers: [UsersService]
})
export class UsersModule {
}
