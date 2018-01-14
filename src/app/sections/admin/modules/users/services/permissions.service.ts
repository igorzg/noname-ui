import {Injectable} from "@angular/core";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {HttpService} from "../../../../../services/http.service";

@Injectable()
export class PermissionsService extends HttpService {

  getServiceAPI(url: string): string {
    return environment.API_HOSTS.USERS + url;
  }

  list(page: number = 1, size: number = 20): Observable<any> {
    return this.get("/permissions", {
      observe: 'response',
      responseType: 'json'
    });
  }

}
