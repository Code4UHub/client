import { TypePromise } from 'types/TypePromise/TypePromise';

export type User = {
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
};

export interface UserPromise extends TypePromise<User> {
  auth_token: string;
}
