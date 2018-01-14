import {NgModule} from "@angular/core";
import {UsersAddComponent} from "./add/users-add.component";
import {UsersListComponent} from "./list/users-list.component";
import {UsersService} from "./services/users.service";
import {CommonModule} from "@angular/common";


@NgModule({
  imports: [CommonModule],
  declarations: [UsersListComponent, UsersAddComponent],
  providers: [UsersService]
})
export class UsersModule {
}
