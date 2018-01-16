import {NgModule} from "@angular/core";
import {LoginModule} from "./login/login.module";
import {AdminModule} from "./admin/admin.module";

@NgModule({
  imports: [
    LoginModule,
    AdminModule
  ]
})
export class RootRoutingModule {}
