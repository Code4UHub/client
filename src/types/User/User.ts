export type User = {
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type UserPromise = {
  status: 'success' | 'failed' | 'error';
  auth_token: string;
  data: User | string;
}
