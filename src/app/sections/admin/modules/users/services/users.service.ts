import {HttpService} from "../../../../../services/http.service";
import {environment} from "../../../../../../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../user.entity";


/**
 * UsersService
 */
@Injectable()
export class UsersService extends HttpService {

  getServiceAPI(url: string): string {
    return environment.API_HOSTS.USERS + url;
  }

  list(page: number = 1, size: number = 20): Observable<any> {
    return this.get("/users", {
      observe: 'response',
      responseType: 'json'
    });
  }

  getById(user_id: string): Observable<any> {
    return this.get("/users/" + user_id, {
      observe: 'response',
      responseType: 'json'
    });
  }

  create(user: User): Observable<any> {
    return this.post("/users", JSON.stringify(user), {
      observe: 'response',
      responseType: 'json'
    });
  }

  update(user: User): Observable<any> {
    return this.put("/users", JSON.stringify(user), {
      observe: 'response',
      responseType: 'json'
    });
  }

}
