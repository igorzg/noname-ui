import {ElementRef, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminGuardian} from "./admin-guardian";
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {CommonModule} from "@angular/common";
import {LoaderDirective, LoaderService} from "./services/loader-service";
import {LoaderResolver} from "./services/loader-resolver";
import {CountryService} from "./services/country.service";

@NgModule({
  declarations: [
    AdminComponent, SideBarComponent, LoaderDirective
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
  providers: [LoaderService, LoaderResolver, CountryService, AdminGuardian],
})
export class AdminModule {
}
