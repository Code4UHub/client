import { TypePromise } from 'types/TypePromise/TypePromise';
import { UserPromise } from 'types/User/User';
import {
  ClassPromise,
  ClassRequest,
  StudentClassListPromise,
  TeacherClassListPromise,
} from 'types/Class/Class';
import { SubjectPromise } from 'types/Subject/Subject';

// http://ec2-3-140-188-143.us-east-2.compute.amazonaws.com:65534/v1
const BASE_URL = 'http://10.147.20.218:65534/v1';

const ENDPOINTS = {
  STUDENT_REGISTER: `${BASE_URL}/student/register`,
  TEACHER_REGISTER: `${BASE_URL}/teacher/register`,
  STUDENT_LOGIN: `${BASE_URL}/student/login`,
  TEACHER_LOGIN: `${BASE_URL}/teacher/login`,
  CLASS: `${BASE_URL}/class`,
  CLASS_CREATE: `${BASE_URL}/class/create`,
  SUBJECT: `${BASE_URL}/subject`,
  TEACHER_CLASSES: (id: string) => `${BASE_URL}/teacher/${id}/class`,
  STUDENT_CLASSES: (id: string) => `${BASE_URL}/student/${id}/class`,
  TIME: `${BASE_URL}/configuration/time`,
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

export const createClass = async (
  class_info: ClassRequest,
  teacher_id: string,
  auth_token: string
): Promise<TypePromise<string>> => {
  const { days, subject, ...rest } = class_info;

  const apiDays = days.reduce((acc, { dayName, dayVal }) => {
    if (dayVal === 'on') acc.push(dayName);

    return acc;
  }, [] as string[]);

  const bodyContent = {
    days: apiDays,
    subject_id: subject.id,
    teacher_id,
    ...rest,
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

export const getStudentClassList = async (
  student_id: string,
  auth_token: string
): Promise<StudentClassListPromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(ENDPOINTS.STUDENT_CLASSES(student_id), options);

  return request.json();
};

export const getTeacherClassList = async (
  teacher_id: string,
  auth_token: string
): Promise<TeacherClassListPromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(ENDPOINTS.TEACHER_CLASSES(teacher_id), options);

  return request.json();
};
