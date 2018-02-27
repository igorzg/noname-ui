import {isArray} from "../../../helpers";
import {FormGroup} from "@angular/forms";

export class Entity<E> {

  private $_isNew: boolean;

  constructor(o: any) {
    if (isArray(o)) {
      throw new Error("Type cannot be array")
    }
    this.fromObj(o);
  }

  static new(): this {
    return new this({$_isNew: true});
  }

  isNew(): boolean {
    return this.$_isNew;
  }

  fromObj(o: any): any {
    if (Object.keys(o).length === 0) {
      throw new Error("Empty entity can be initialized only via static .new() eg. Entity.new()")
    }
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
