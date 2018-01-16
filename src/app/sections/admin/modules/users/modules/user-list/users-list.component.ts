import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {LoggerService} from "../../../../../../services/logger.service";
import {Router} from "@angular/router";

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
              private router: Router,
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

  edit(user_id: number): Promise<boolean> {
    return this.router.navigate(["admin/users/edit", user_id]);
  }

}
