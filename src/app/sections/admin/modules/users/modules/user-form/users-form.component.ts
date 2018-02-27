import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../user.entity";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import 'rxjs/add/operator/delay';
import {LoaderService} from "../../../../services/loader-service";

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

  /**
   * Constructor
   * @param {ActivatedRoute} route
   * @param {UsersService} usersService
   * @param {Router} router
   * @param {LoaderService} loader
   */
  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private router: Router,
              private loader: LoaderService) {
    this.id = route.snapshot.paramMap.get('id');
    this.loader.show();
  }

  /**
   * Register http data event
   */
  ngOnInit(): void {
    if (this.id) {
      this.usersService
        .getById(this.id)
        .delay(300)
        .subscribe((response: HttpResponse<Object>) => {
          this.loader.hide();
          this.user = new User(response.body);
          this.user.fillForm(this.form);
        });
    }
  }

  /**
   * Save data in to db and navigate back to users list
   */
  onSubmit() {
    this.loader.show();
    this.user = this.user.fromObj(this.form.value);
    this.usersService
      .update(this.user)
      .delay(300)
      .subscribe((response: HttpResponse<Object>) => {
        this.router.navigate(["../../"], {relativeTo: this.route}).then(() => {
          this.loader.hide();
        })
      });

  }
}
