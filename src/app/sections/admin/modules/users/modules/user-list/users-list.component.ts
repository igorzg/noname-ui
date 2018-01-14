import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {LoggerService} from "../../../../../../services/logger.service";

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

  constructor(private usersService: UsersService,
              private loggerService: LoggerService) {
  }

  data: Array<any> = [];

  ngOnInit(): void {
    this.usersService.list().subscribe(response => {
      let data = response.body;
      this.loggerService.log("users list", data);
      this.data = data;
    });
  }

  edit(user_id: number) {

  }

}
