import { TypePromise } from 'types/TypePromise/TypePromise';
import { UserPromise } from 'types/User/User';
import {
  ClassPromise,
  ClassRequest,
  StudentClassListPromise,
  TeacherClassListPromise,
} from 'types/Class/Class';
import { SubjectPromise } from 'types/Subject/Subject';
import { SubjectModulePromise } from 'types/SubjectModule/SubjectModule';
import {
  StudentRequestPromise,
  RequestAnswer,
} from 'types/StudentRequest/StudentRequest';
import {
  ModulePromise,
  SubjectModuleListPromise,
  UpdateModule,
} from 'types/Module/Module';
import {
  HomeworkRequest,
  HomeworkResponsePromise,
} from 'types/Homework/Homework';

import { GroupGraphPromise } from 'types/GroupGraph/GroupGraphType';
import { QuestionOption, TestCase } from 'types/CreateQuestion/CreateQuestion';

import { formatCreateQuestionBody } from 'utils/format/formatCreateQuestion';
import { HomeworkQuestionListPromise } from 'types/Questions/Question';

// const BASE_URL = http://ec2-3-140-188-143.us-east-2.compute.amazonaws.com:65534/v1
const BASE_URL = 'http://10.147.20.218:65534/v1';
// const BASE_URL =
// 'http://ec2-3-140-188-143.us-east-2.compute.amazonaws.com:65534/v1';

const ENDPOINTS = {
  STUDENT_REGISTER: `${BASE_URL}/student/register`,
  TEACHER_REGISTER: `${BASE_URL}/teacher/register`,
  STUDENT_LOGIN: `${BASE_URL}/student/login`,
  TEACHER_LOGIN: `${BASE_URL}/teacher/login`,
  CLASS: `${BASE_URL}/class`,
  CLASS_CREATE: `${BASE_URL}/class/create`,
  CLASS_MODULES: (id_class: string) => `${BASE_URL}/class/${id_class}/modules`,
  CLASS_LEADERBOARD: (id_class: string) =>
    `${BASE_URL}/class/${id_class}/leaderboard`,
  PROGRESS_MODULES: (id_class: string, id_student: string) =>
    `${BASE_URL}/challenge/class/${id_class}/student/${id_student}`,
  UPDATE_MODULES: (id_class: string) => `${BASE_URL}/class/${id_class}/modules`,
  SUBJECT: `${BASE_URL}/subject`,
  STUDENT_REQUESTS: `${BASE_URL}/teacher`,
  ACCEPT_ONE_STUDENT: `${BASE_URL}/class/accept_student`,
  REJECT_ONE_STUDENT: `${BASE_URL}/class/reject_student`,
  ACCEPT_MANY_STUDENTS: `${BASE_URL}/class/accept_students`,
  REJECT_MANY_STUDENTS: `${BASE_URL}/class/reject_students`,
  TEACHER_CLASSES: (id: string) => `${BASE_URL}/teacher/${id}/class`,
  STUDENT_CLASSES: (id: string) => `${BASE_URL}/student/${id}/class`,
  TIME: `${BASE_URL}/configuration/time`,
  SUBJECT_MODULES: (class_id: string) =>
    `${BASE_URL}/subject/${class_id}/modules`,
  CREATE_QUESTION: `${BASE_URL}/homework/question`,
  HOMEWORK_QUESTIONS: (subject_id: string, difficulty: 1 | 2 | 3) =>
    `${BASE_URL}/homework/question/subject/${subject_id}/difficulty/${difficulty}`,
  SUBJECT_MODULES2: (id: string) => `${BASE_URL}/subject/${id}/modules`,
  HOMEWORK: `${BASE_URL}/homework`,
  MODULE_GRAPH: (class_id: string, i: number) =>
    `${BASE_URL}/class/${class_id}/module_${i === 1 ? 'average' : 'progress'}`,
  CHALLENGE_GRAPH: (class_id: string, i: number) =>
    `${BASE_URL}/class/${class_id}/challenge_${
      i === 3 ? 'average' : 'progress'
    }`,
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

// ======= ALL MODULES GIVEN A SUBJECT =========
export const getSubjectModules = async (
  auth_token: string,
  class_id: string
): Promise<SubjectModulePromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(ENDPOINTS.SUBJECT_MODULES(class_id), options);

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

// ====== MODULES FROM A CLASS  =======
export const getClassModules = async (
  class_id: string,
  auth_token: string
): Promise<ModulePromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(ENDPOINTS.CLASS_MODULES(class_id), options);

  return request.json();
};

export const getStudentModuleProgress = async (
  class_id: string,
  auth_token: string,
  student_id: string
): Promise<ModulePromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(
    ENDPOINTS.PROGRESS_MODULES(class_id, student_id),
    options
  );

  return request.json();
};

export const updateClassModules = async (
  changed_modules: UpdateModule[],
  auth_token: string,
  id_class: string
): Promise<TypePromise<string>> => {
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(changed_modules),
  };
  const request = await fetch(ENDPOINTS.UPDATE_MODULES(id_class), options);
  return request.json();
};

// ====== GRAPHS FROM A CLASS  =======
export const getGraphData = async (
  auth_token: string,
  id_class: string,
  graph_id: number
): Promise<GroupGraphPromise> => {
  // Information for leaderboard
  if (graph_id === 0) {
    const options: RequestInit = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };
    const request = await fetch(ENDPOINTS.CLASS_LEADERBOARD(id_class), options);
    return request.json();
  }
  // Information for every other graph
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };
  if (graph_id < 3) {
    const request = await fetch(
      ENDPOINTS.MODULE_GRAPH(id_class, graph_id),
      options
    );
    return request.json();
  }
  const request = await fetch(
    ENDPOINTS.CHALLENGE_GRAPH(id_class, graph_id),
    options
  );
  return request.json();
};

// ======== CREATE QUESTION ============
export const createQuestion = async (
  auth_token: string,
  general_config: { [key: string]: any },
  options_config: (QuestionOption | TestCase)[],
  answer: number,
  firstName: string,
  lastName: string
): Promise<TypePromise<string>> => {
  const bodyContent = formatCreateQuestionBody(
    general_config,
    options_config,
    answer,
    firstName,
    lastName
  );

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(bodyContent),
  };

  const request = await fetch(`${ENDPOINTS.CREATE_QUESTION}`, options);
  return request.json();
};
// ====== GET HOMEWORK QUESTIONS BY SUBJECT AND DIFFICULTY   =======
export const getSubjectHomeworkQuestions = async (
  auth_token: string,
  subject_id: string,
  difficulty: 1 | 2 | 3
): Promise<HomeworkQuestionListPromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(
    ENDPOINTS.HOMEWORK_QUESTIONS(subject_id, difficulty),
    options
  );

  return request.json();
};

// ====== GET SUBJECT MODULES    =======
export const getsSubjectModules = async (
  auth_token: string,
  subject_id: string
): Promise<SubjectModuleListPromise> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(ENDPOINTS.SUBJECT_MODULES2(subject_id), options);

  return request.json();
};

// ====== CREATE HOMEWORK =======
export const createHomework = async (
  auth_token: string,
  homework: HomeworkRequest
): Promise<HomeworkResponsePromise> => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { class_id, questions, ...rest } = homework;

  const body = {
    ...rest,
    class_id: (class_id as { id: string; value: string }).id,
    question_ids: questions.map((question) => question.question_h_id),
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const request = await fetch(ENDPOINTS.HOMEWORK, options);

  return request.json();
};
