import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RootRoutingModule} from "./sections/root-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {Authentication} from "./services/authentication.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        pathMatch: "full",
        redirectTo: "admin"
      }
    ]),
    RootRoutingModule
  ],
  providers: [CommonModule, Authentication],
  bootstrap: [AppComponent]
})
export class AppModule {
}
