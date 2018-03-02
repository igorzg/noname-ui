import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../user.entity";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import 'rxjs/add/operator/delay';
import {LoaderService} from "../../../../services/loader-service";
import {CountryService} from "../../../../services/country.service";
import {Country} from "../../../../country.entity";
import {zip} from "rxjs/observable/zip";

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
    email: new FormControl(),
    country_id: new FormControl()
  });

  user: User;
  countries: Array<Country>;

  /**
   * Constructor
   * @param {ActivatedRoute} route
   * @param {UsersService} usersService
   * @param {CountryService} countryService
   * @param {Router} router
   * @param {LoaderService} loader
   */
  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private countryService: CountryService,
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
      zip(
        this.usersService.getById(this.id).delay(300),
        this.countryService.list().delay(300)
      )
        .subscribe((values: Array<HttpResponse<Object>>) => {
          this.loader.hide();
          this.user = new User(values[0].body);
          this.user.fillForm(this.form);
          this.countries = Country.fromArray(<Array<any>> values[1].body);
        });
    } else {
      this.user = User.new();
      this.countryService.list()
        .subscribe((response: HttpResponse<Object>) => {
          this.loader.hide();
          this.countries = Country.fromArray(<Array<any>> response.body);
        });
    }
  }

  /**
   * Save data in to db and navigate back to users list
   */
  onSubmit() {
    this.loader.show();
    if (this.user.isNew()) {
      this.usersService
        .create(this.user.fromObj(this.form.value))
        .delay(300)
        .subscribe((response: HttpResponse<Object>) => this.goBack());
    } else {
      this.usersService
        .update(this.user.fromObj(this.form.value))
        .delay(300)
        .subscribe((response: HttpResponse<Object>) => this.goBack());
    }
  }

  /**
   * Navigate back to list
   */
  private goBack() {
    this.router.navigate(["../../"], {relativeTo: this.route}).then(() => {
      this.loader.hide();
    })
  }
}
