const BASE_URL = 'v1';

const ENDPOINTS = {
  STUDENT: `${BASE_URL}/student`,
  TEACHER: `${BASE_URL}/teacher`,
};

export const createUser = async <T>(user: {
  student_id?: string;
  teacher_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<T> => {
  let request;

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  if (user.student_id) {
    request = await fetch(ENDPOINTS.STUDENT, options);
  } else {
    request = await fetch(ENDPOINTS.TEACHER, options);
  }

  return request.json();
};

export const logUser = async <T>(user: {
  email: string,
  password: string,
}): Promise<T> => {
  let request;
  const isStudent = user.email.toLowerCase().startsWith("a");

  if (isStudent) {
    request = await fetch(encodeURI(`${ENDPOINTS.STUDENT}/email=${user.email}&password=${user.password}`));
  } else {
    request = await fetch(encodeURI(`${ENDPOINTS.TEACHER}/email=${user.email}&password=${user.password}`));
  }

  return request.json();
}

