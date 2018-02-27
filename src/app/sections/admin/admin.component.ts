import {Component} from "@angular/core";
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {LoaderService} from "./services/loaders";

/**
 * AdminComponent
 * @constructor
 * @function
 * @name SideBarComponent
 *
 * @description
 * Load navigation and main page area
 */
@Component({
  selector: "admin",
  templateUrl: "admin.component.html"
})
export class AdminComponent {


  /**
   * @param {Boolean} showNavBar
   * @description
   * Show navigation bar
   */
  showNavBar: boolean = false;

  /**
   * Loader service is forwarded to loader directive
   * @param {LoaderService} loaderService
   */
  constructor(private loaderService: LoaderService) {
  }


  /**
   * @function
   * @name SideBarComponent#toggleNavBar
   *
   * @description
   * Togle navbar
   */
  onNavBarToggle(toggle) {
    this.showNavBar = toggle;
  }
}
