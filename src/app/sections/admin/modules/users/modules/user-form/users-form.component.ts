import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../user.entity";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {AdminSideBodyLoaderService, ILoader} from "../../../../services/loaders";
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/delay';

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
export class UsersFromComponent implements OnInit, ILoader {

  private id: string;

  form: FormGroup = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    username: new FormControl(),
    email: new FormControl()
  });

  user: User;

  events: Array<Subscription> = [];
  isLoading: boolean = false;

  /**
   * Constructor
   * @param {ActivatedRoute} route
   * @param {UsersService} usersService
   * @param {Router} router
   * @param {AdminSideBodyLoaderService} loader
   */
  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private router: Router,
              private loader: AdminSideBodyLoaderService) {
    this.id = route.snapshot.paramMap.get('id');

    /**
     * Register loader
     */
    this.events.push(
      this.loader.subscribe(isLoading => this.isLoading = isLoading)
    );

    /**
     * Show loader
     */
    this.loader.show();

  }


  /**
   * On destroy destroy all refs
   */
  ngOnDestroy(): void {
    this.events.forEach(item => item.unsubscribe());
    this.events = [];
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
    this.user = this.user.fromObj(this.form.value);
    this.usersService
      .update(this.user)
      .subscribe((response: HttpResponse<Object>) => {
        console.log('updated', response);
        this.router.navigate(["../../"], {relativeTo: this.route})
      });

  }
}
