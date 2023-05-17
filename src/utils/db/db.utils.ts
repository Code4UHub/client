import { TypePromise } from 'types/TypePromise/TypePromise';
import { UserPromise } from 'types/User/User';
import { ClassPromise, ClassRequest } from 'types/Class/Class';
import { SubjectPromise } from 'types/Subject/Subject';
import {
  StudentRequestPromise,
  RequestAnswer,
} from 'types/StudentRequest/StudentRequest';

const BASE_URL = 'v1';

const ENDPOINTS = {
  STUDENT_REGISTER: `${BASE_URL}/student/register`,
  TEACHER_REGISTER: `${BASE_URL}/teacher/register`,
  STUDENT_LOGIN: `${BASE_URL}/student/login`,
  TEACHER_LOGIN: `${BASE_URL}/teacher/login`,
  CLASS: `${BASE_URL}/class`,
  CLASS_CREATE: `${BASE_URL}/class/create`,
  SUBJECT: `${BASE_URL}/subject`,
  STUDENT_REQUESTS: `${BASE_URL}/teacher`,
  ACCEPT_ONE_STUDENT: `${BASE_URL}/class/accept_student`,
  REJECT_ONE_STUDENT: `${BASE_URL}/class/reject_student`,
  ACCEPT_MANY_STUDENTS: `${BASE_URL}/class/accept_students`,
  REJECT_MANY_STUDENTS: `${BASE_URL}/class/reject_students`,
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

export const getStudentRequests = async (
  auth_token: string,
  teacher_id: string
): Promise<StudentRequestPromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };
  const request = await fetch(
    `${ENDPOINTS.STUDENT_REQUESTS}/${teacher_id}/student_class`,
    options
  );

  return request.json();
};

export const respondOneStudentRequest = async (
  auth_token: string,
  class_id: string,
  student_id: string,
  action: 'accept' | 'reject'
): Promise<TypePromise<string>> => {
  const bodyContent = {
    class_id,
    student_id,
  };

  // ACCEPT ONE STUDENT
  if (action === 'accept') {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify(bodyContent),
    };
    const request = await fetch(ENDPOINTS.ACCEPT_ONE_STUDENT, options);
    return request.json();
  }

  // REJECT ONE STUDENT
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(bodyContent),
  };

  const request = await fetch(ENDPOINTS.REJECT_ONE_STUDENT, options);
  return request.json();
};

export const respondManyStudentRequest = async (
  auth_token: string,
  rows: RequestAnswer[],
  action: 'accept' | 'reject'
): Promise<TypePromise<string>> => {
  const bodyContent = rows;

  // ACCEPT ONE STUDENT
  if (action === 'accept') {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify(bodyContent),
    };
    const request = await fetch(ENDPOINTS.ACCEPT_MANY_STUDENTS, options);
    return request.json();
  }

  // REJECT ONE STUDENT
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(bodyContent),
  };

  const request = await fetch(ENDPOINTS.REJECT_MANY_STUDENTS, options);
  return request.json();
};
