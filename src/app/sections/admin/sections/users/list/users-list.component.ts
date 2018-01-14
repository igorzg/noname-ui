import {Component, Inject, OnInit} from "@angular/core";
import {UsersService} from "../services/users.service";

/**
 * UsersListComponent
 * @constructor
 * @function
 * @name UsersListComponent
 *
 * @description
 * User list component
 */
@Component({
  selector: "users-list",
  templateUrl: "users-list.component.html"
})
export class UsersListComponent implements OnInit {

  constructor(private usersService: UsersService) {
  }

  data: Array<any> = [];

  ngOnInit(): void {
    this.usersService.list().subscribe(data => this.data = data);
  }

}
