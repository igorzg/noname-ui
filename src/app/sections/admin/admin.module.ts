import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminGuardian} from "./admin-guardian";
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AdminComponent, SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "admin",
        canActivate: [AdminGuardian],
        component: AdminComponent,
        children: [
          {
            path: "users",
            loadChildren: "./modules/users/users.module#UsersModule"
          },
          {
            path: "",
            redirectTo: "users",
            pathMatch: "full"
          }
        ]
      }
    ])
  ],
  providers: [AdminGuardian],
})
export class AdminModule {
}
