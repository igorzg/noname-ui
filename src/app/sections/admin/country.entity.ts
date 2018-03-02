import {Entity} from "./entity";

export class Country extends Entity<Country> {

  country_id: number;
  iso: string;
  name: string;
  iso3: string;
  num_code: number;
  phone_code: number;

  static new(): Country {
    return new Country({$_isNew: true});
  }

  static fromArray(o: Array<any>): Array<Country> {
    return o.map(i => new Country(i));
  }
}
