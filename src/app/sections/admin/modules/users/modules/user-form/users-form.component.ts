import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../user.entity";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";

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

  form: FormGroup = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    username: new FormControl(),
    email: new FormControl()
  });

  user: User;

  constructor(route: ActivatedRoute, private usersService: UsersService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.usersService
        .getById(this.id)
        .subscribe((response: HttpResponse<Object>) => {
          this.user = new User(response.body);
          this.user.fillForm(this.form);
        });
    }
  }

  onSubmit() {
    this.user = this.user.fromObj(this.form.value);
    this.usersService
      .update(this.user)
      .subscribe((response: HttpResponse<Object>) => {
        console.log('updated', response)
      });

  }
}
