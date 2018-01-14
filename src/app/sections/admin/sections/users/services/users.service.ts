import {HttpService} from "../../../../../services/http.service";
import {environment} from "../../../../../../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";


/**
 * UsersService
 */
@Injectable()
export class UsersService extends HttpService {

  getServiceAPI(url: string): string {
    return environment.API_HOSTS.USERS + url;
  }

  list(): Observable<any> {
    return this.get("/users", {
      observe: 'response',
      responseType: 'json'
    });
  }

}
