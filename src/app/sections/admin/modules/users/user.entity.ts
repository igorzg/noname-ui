import {Entity} from "../entity";

export class User extends Entity<User> {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  birth: string;
  gender: string;
  country_id: number;
}
