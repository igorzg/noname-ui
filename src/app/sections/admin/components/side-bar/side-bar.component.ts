import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {Authentication} from "../../../../services/authentication.service";
import {LinkMenuModel} from "./link-menu.model";

/**
 * SideBarComponent
 * @constructor
 * @function
 * @name SideBarComponent
 *
 * @description
 * Side bar handler
 */
@Component({
  selector: "side-bar",
  templateUrl: "side-bar.component.html"
})
export class SideBarComponent implements OnInit {


  /**
   * @param {EventEmitter} navBarToggle
   * @description
   * Navigation bar change event
   */
  @Output("toggle")
  navBarToggle: EventEmitter<any> = new EventEmitter();
  /**
   * @param {Boolean} brandImage
   * @description
   * Brand image
   */
  brandImage: string = "assets/angular.svg";
  /**
   * @param {Boolean} showNavBar
   * @description
   * Show navigation bar
   */
  isNavBarToggled: boolean = false;
  /**
   * @param {Boolean} showNavBar
   * @description
   * Show navigation bar
   */
  submenuToggle: Map<number, boolean> = new Map();

  menu: Array<LinkMenuModel> = [
    new LinkMenuModel(
      "User management",
      "glyphicon-user",
      null,
      [
        new LinkMenuModel(
          "Users",
          "glyphicon-list",
          "/admin/users"
        ),
        new LinkMenuModel(
          "Permissions",
          "glyphicon-list",
          "/admin/users/permissions"
        )
      ]
    ),
    new LinkMenuModel(
      "Articles",
      "glyphicon-pencil",
      null,
      [

      ]
    ),
  ];

  constructor(private auth: Authentication) {
  }

  // @todo implement menu logic
  ngOnInit() {

  }

  /**
   * @function
   * @name SideBarComponent#toggleNavBar
   *
   * @description
   * Toggle navigation bar
   */
  toggleNavBar() {
    this.isNavBarToggled = !this.isNavBarToggled;
    this.navBarToggle.next(this.isNavBarToggled);
  }

  /**
   * Check if is toggled
   * @param {number} index
   * @returns {boolean | undefined}
   */
  isToggled(index: number) {
    return this.submenuToggle.get(index);
  }

  /**
   * @function
   * @name SideBarComponent#toggleSubMenu
   *
   * @description
   * Toggle sub menu
   */
  toggleSubMenu(index: number, $event) {
    $event.preventDefault();
    this.submenuToggle.forEach((value, key) => {
      if (key !== index) {
        this.submenuToggle.set(key, false);
      }
    });
    this.submenuToggle.set(index, !this.submenuToggle.get(index));
  }

  /**
   * @function
   * @name SideBarComponent#doLogout
   *
   * @description
   * Logout action
   */
  doLogout($event) {
    $event.preventDefault();
    this.auth.doLogout();
  }
}
