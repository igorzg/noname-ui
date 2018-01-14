import {Injectable} from "@angular/core";


@Injectable()
export class LoggerService {

  log(message, data) {
    console.log(message, data);
  }

}
