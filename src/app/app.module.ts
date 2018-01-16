import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RootRoutingModule} from "./sections/root-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {Authentication} from "./services/authentication.service";
import {LoggerService} from "./services/logger.service";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([], {
      enableTracing: environment.enableRouterTracing
    }),
    RootRoutingModule
  ],
  providers: [CommonModule, Authentication, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
