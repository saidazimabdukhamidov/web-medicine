import {Role} from './role';

export class Users {
  user_id: number;
  user_role: Role;
  login: string;
  password: string;
  first_name: string;
  last_name: string;
  father_name: string;
  birth_date: string;
  phone_number: string;
  passport_number: string;
  profession: string;
  address: string;
  token?: string;
}
