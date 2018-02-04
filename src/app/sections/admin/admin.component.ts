import {Component, OnDestroy, OnInit} from "@angular/core";
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {AdminSideBodyLoaderService, ILoader} from "./services/loaders";
import {Subscription} from "rxjs/Subscription";

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
export class AdminComponent implements ILoader {


  /**
   * @param {Boolean} showNavBar
   * @description
   * Show navigation bar
   */
  showNavBar: boolean = false;

  /**
   * @param {Boolean} isLoading
   * @description
   * Show loader
   */
  isLoading: boolean = false;

  events: Array<Subscription> = [];

  constructor(private loader: AdminSideBodyLoaderService) {
    this.events.push(
      this.loader.subscribe(isLoading => this.isLoading = isLoading)
    );
  }

  /**
   * On destroy destroy all refs
   */
  ngOnDestroy(): void {
    this.events.forEach(item => item.unsubscribe());
    this.events = [];
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
