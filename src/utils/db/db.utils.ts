import { TypePromise } from 'types/TypePromise/TypePromise';
import { UserPromise } from 'types/User/User';
import { ClassPromise } from 'types/Class/Class';
import { SubjectPromise } from 'types/Subject/Subject';

const BASE_URL = 'v1';

const ENDPOINTS = {
  STUDENT_REGISTER: `${BASE_URL}/student/register`,
  TEACHER_REGISTER: `${BASE_URL}/teacher/register`,
  STUDENT_LOGIN: `${BASE_URL}/student/login`,
  TEACHER_LOGIN: `${BASE_URL}/teacher/login`,
  CLASS: `${BASE_URL}/class`,
  CLASS_CREATE: `${BASE_URL}/class/create`,
  SUBJECT: `${BASE_URL}/subject`,
};

export const createStudent = async (user: {
  [key: string]: string;
}): Promise<UserPromise> => {
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

export const createTeacher = async (user: {
  [key: string]: string;
}): Promise<UserPromise> => {
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

export const logStudent = async (
  email: string,
  password: string
): Promise<UserPromise> => {
  const request = await fetch(
    `${ENDPOINTS.STUDENT_LOGIN}?email=${email}&password=${password}`
  );

  return request.json();
};

export const logTeacher = async (
  email: string,
  password: string
): Promise<UserPromise> => {
  const request = await fetch(
    `${ENDPOINTS.TEACHER_LOGIN}?email=${email}&password=${password}`
  );

  return request.json();
};

export const getClass = async (
  auth_token: string,
  class_code: string
): Promise<ClassPromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(`${ENDPOINTS.CLASS}/${class_code}`, options);

  return request.json();
};

export const joinClass = async (
  auth_token: string,
  class_id: string,
  student_id: string
): Promise<TypePromise<string>> => {
  const bodyContent = {
    class_id,
    student_id,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(bodyContent),
  };

  const request = await fetch(
    `${ENDPOINTS.CLASS}/${class_id}/register`,
    options
  );

  return request.json();
};

export type ClassInfo = {
  subject: { id: string; name: string };
  class_id: string;
  start_time: string;
  end_time: string;
  finished_date: string;
  LU: string;
  MA: string;
  MI: string;
  JU: string;
  VI: string;
};

export const createClass = async (
  {
    subject,
    class_id,
    start_time,
    end_time,
    finished_date,
    LU,
    MA,
    MI,
    JU,
    VI,
  }: ClassInfo,
  teacher_id: string,
  auth_token: string
): Promise<TypePromise<string>> => {
  const days = [];

  if (LU === 'on') days.push('LU');
  if (MA === 'on') days.push('MA');
  if (MI === 'on') days.push('MI');
  if (JU === 'on') days.push('JU');
  if (VI === 'on') days.push('VI');

  const bodyContent = {
    class_id,
    is_finished: false,
    finished_date,
    days,
    start_time,
    end_time,
    subject_id: subject.id,
    teacher_id,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(bodyContent),
  };

  const request = await fetch(ENDPOINTS.CLASS_CREATE, options);

  return request.json();
};

export const getSubjects = async (
  auth_token: string
): Promise<SubjectPromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(ENDPOINTS.SUBJECT, options);

  return request.json();
};
