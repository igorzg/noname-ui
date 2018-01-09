import {NgModule} from "@angular/core";
import {LoginModule} from "./login/login.module";
import {AdminModule} from "./admin/admin.module";
import {Authentication} from "../services/authentication.service";

@NgModule({
  imports: [
    LoginModule,
    AdminModule
  ],
  providers: [Authentication]
})
export class RootRoutingModule {}
