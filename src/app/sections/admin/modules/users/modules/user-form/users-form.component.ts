import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";

/**
 * UsersAddComponent
 * @constructor
 * @function
 * @name UsersFromComponent
 *
 * @description
 * Add user component
 */
@Component({
  selector: "users-form",
  templateUrl: "users-form.component.html"
})
export class UsersFromComponent implements OnInit {

  private id: string;

  constructor(route: ActivatedRoute, usersService: UsersService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

  }
}