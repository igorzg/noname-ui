import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {timer} from "rxjs/observable/timer";
import {Observable} from "rxjs/Observable";
import {LoaderService} from "./loader-service";

@Injectable()
export class LoaderResolver implements Resolve<number> {

  constructor(private loaderService: LoaderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    this.loaderService.show();
    return timer(300).toPromise().then(n => {
      this.loaderService.hide();
      return n;
    });
  }

}
