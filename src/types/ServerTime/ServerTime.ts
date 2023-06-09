import { TypePromise } from 'types/TypePromise/TypePromise';

export type ServerTime = {
  currentTime: string;
};

export interface ServerTimePromise extends TypePromise<ServerTime> {}
