export interface TypePromise<T> {
  status: 'success' | 'failed' | 'error';
  data: T | string;
}
