import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {getCookie, removeCookie, setCookie} from "../helpers";


/**
 * @enum
 * @name AuthStatus
 *
 * @description
 * Three authentication statuses
 */
export enum AuthStatus {
  LOGIN,
  LOGGED_IN,
  INVALID_CREDENTIALS,
  LOGIN_ATTEMPT,
  LOGOUT
}

/**
 * Authentication service
 * @constructor
 * @function
 * @name Authentication
 *
 * @description
 * Is responsible for authenticating in to system
 */
@Injectable()
export class Authentication {
  /**
   * @param {Boolean} statusChange
   * @description
   * Authentication status
   */
  private authStatus: BehaviorSubject<AuthStatus> = new BehaviorSubject(AuthStatus.LOGIN);

  /**
   * @function
   * @name Authentication#constructor
   *
   * @description
   * On construct assign status change
   */
  constructor(private router: Router, private http: HttpClient) {
    this.onAuthChange((status) => {
      let auth = getCookie(environment.SESSION_KEY);
      switch (status) {
        case AuthStatus.LOGIN:
          if (!!auth) {
            this.authStatus.next(AuthStatus.LOGGED_IN);
          }
          break;
        case AuthStatus.LOGGED_IN:
          if (!auth) {
            removeCookie(environment.SESSION_KEY);
            this.authStatus.next(AuthStatus.LOGIN);
          } else {
            router.navigateByUrl(environment.routing.UI.ADMIN);
          }
          break;
        case AuthStatus.INVALID_CREDENTIALS:
        case AuthStatus.LOGOUT:
          removeCookie(environment.SESSION_KEY);
          router.navigateByUrl(environment.routing.UI.LOGIN);
          break;
      }
    });

    /**
     * Check if there is cookie
     */
    if (!getCookie(environment.SESSION_KEY)) {
      this.doLogout();
    }
  }

  /**
   * @function
   * @name Authentication#getServiceAPI
   *
   * @description
   * Return service api url
   */
  private getServiceAPI(): string {
    return environment.API_HOSTS.USERS;
  }

  /**
   * @function
   * @name Authentication#onAuthChange
   *
   * @description
   * Auth status change event
   */
  onAuthChange(generatorOrNext?: any, error?: any, complete?: any) {
    this.authStatus.subscribe(generatorOrNext, error, complete);
  }

  /**
   * @function
   * @name Authentication#doLogin
   *
   * @description
   * authenticate to system via username and password
   */
  doLogin(username: string, password: string): Promise<AuthStatus> {
    return new Promise((resolve, reject) => {
      let options = {
        headers: new HttpHeaders()
      };
      options.headers.set("Content-Type", "application/json");
      this.authStatus.next(AuthStatus.LOGIN_ATTEMPT);
      this.http.post(
        this.getServiceAPI() + environment.routing.API.USER.AUTHENTICATE,
        JSON.stringify({
          username: username,
          password: password
        }),
        options
      )
        .subscribe(
          (data: any) => {
            setCookie(environment.SESSION_KEY, data.token, environment.SESSION_EXPIRE_IN_DAYS);
            setTimeout(() => this.authStatus.next(AuthStatus.LOGGED_IN), 100);
            resolve(AuthStatus.LOGGED_IN);
          },
          () => {
            this.authStatus.next(AuthStatus.INVALID_CREDENTIALS);
            reject(AuthStatus.INVALID_CREDENTIALS);
          }
        );
    });

  }

  /**
   * @function
   * @name Authentication#isLoggedIn
   *
   * @description
   * Get info if user is logged in into system
   */
  isLoggedIn(): boolean {
    return this.authStatus.getValue() === AuthStatus.LOGGED_IN;
  }

  /**
   * @function
   * @name Authentication#doLogout
   *
   * @description
   * Send logout event
   */
  doLogout() {
    this.authStatus.next(AuthStatus.LOGOUT);
  }
}
