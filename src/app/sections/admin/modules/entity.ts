import {isArray} from "../../../helpers";
import {FormGroup} from "@angular/forms";

export class Entity<E> {

  constructor(o: any) {
    if (isArray(o)) {
      throw new Error("Type cannot be array")
    }
    this.fromObj(o);
  }

  fromObj(o: any): E {
    Object.keys(o).forEach(k => {
      this[k] = o[k];
    });
    return this;
  }

  fromArray(o: Array<any>): Array<E> {
    return o.map(i => this.fromObj(i));
  }

  fillForm(group: FormGroup) {
    Object.keys(this).forEach(key => {
      if (group.get(key)) {
        group.get(key).setValue(this[key]);
      }
    });
  }
}
