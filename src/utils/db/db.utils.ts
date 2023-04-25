import { UserPromise } from 'types/User/User';

const BASE_URL = 'v1';

const ENDPOINTS = {
  STUDENT_REGISTER: `${BASE_URL}/student/register`,
  TEACHER_REGISTER: `${BASE_URL}/teacher/register`,
  STUDENT_LOGIN: `${BASE_URL}/student/login`,
  TEACHER_LOGIN: `${BASE_URL}/teacher/login`,
};

export const createStudent = async (user: { [key: string]: string }): Promise<UserPromise> => {

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const request = await fetch(ENDPOINTS.STUDENT_REGISTER, options);

  return request.json();
};

export const createTeacher = async (user: { [key: string]: string }): Promise<UserPromise> => {

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const request = await fetch(ENDPOINTS.TEACHER_REGISTER, options);

  return request.json();
};

export const logStudent = async (email: string, password: string): Promise<UserPromise> => {

  const request = await fetch(`${ENDPOINTS.STUDENT_LOGIN}?email=${email}&password=${password}`);

  return request.json();
};

export const logTeacher = async (email: string, password: string): Promise<UserPromise> => {

  const request = await fetch(`${ENDPOINTS.TEACHER_LOGIN}?email=${email}&password=${password}`);

  return request.json();
};

