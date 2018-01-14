import {Component, OnInit} from "@angular/core";
import {LoggerService} from "../../../../../../services/logger.service";
import {PermissionsService} from "../../services/permissions.service";

/**
 * PermissionsListComponent
 * @constructor
 * @function
 * @name PermissionsListComponent
 *
 * @description
 * Permissions list component
 */
@Component({
  selector: "permissions-list",
  templateUrl: "permissions-list.component.html"
})
export class PermissionsListComponent implements OnInit {

  constructor(private permissionsService: PermissionsService,
              private loggerService: LoggerService) {
  }

  data: Array<any> = [];

  ngOnInit(): void {
    this.permissionsService.list().subscribe(response => {
      let data = response.body;
      this.loggerService.log("permissions list", data);
      this.data = data;
    });
  }

  edit(user_id: number) {

  }

}
