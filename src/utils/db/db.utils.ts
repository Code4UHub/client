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
  HomeworkPromise,
  HomeworkRequest,
  HomeworkResponsePromise,
  StudentAllHomeworksPromise,
  StudentClassHomeworksPromise,
} from 'types/Homework/Homework';
import { HomeworkResultPromise } from 'types/HomeworkResult/HomeworkResult';

import { GroupGraphPromise } from 'types/GroupGraph/GroupGraphType';
import {
  ModulePromise,
  UpdateModule,
  SubjectModuleListPromise,
  ModuleProgressListPromise,
} from 'types/Module/Module';
import {
  ChallengeQuestions,
  ChallengeQuestionsPromise,
  HomeworkQuestionPoolPromise,
  HomeworkQuestions,
  HomeworkQuestionsPromise,
  OpenQuestionSolution,
} from 'types/Questions/Question';
import { CompiledCodeResultsPromise } from 'types/CompiledCodeResults/CompiledCodeResults';
import { Challenge } from 'types/Challenge/Challenge';
import { ServerTimePromise } from 'types/ServerTime/ServerTime';

import { formatDateString } from 'utils/format/formatDate';
import { QuestionOption, TestCase } from 'types/CreateQuestion/CreateQuestion';

import { formatCreateQuestionBody } from 'utils/format/formatCreateQuestion';
import { LeaderboardPromise } from 'types/Leaderboard/Leaderboard';
import {
  ChallengeSubmitPromise,
  HomeworkSubmitPromise,
} from 'types/Submit/Submit';

const BASE_URL = process.env.REACT_APP_API_URL;

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
  HOMEWORK_QUESTIONS_DIFFICULTY: (subject_id: string, difficulty: 1 | 2 | 3) =>
    `${BASE_URL}/homework/question/subject/${subject_id}/difficulty/${difficulty}`,
  SUBJECT_MODULES: (class_id: string) =>
    `${BASE_URL}/subject/${class_id}/modules`,
  CREATE_QUESTION: `${BASE_URL}/homework/question`,
  HOMEWORK: `${BASE_URL}/homework`,
  HOMEWORK_QUESTIONS: (idHomework: string, idStudent: string) =>
    `${BASE_URL}/homework/${idHomework}/student/${idStudent}/questions`,
  EXECUTE_CODE: `${BASE_URL}/run`,
  SAVE_HOMEWORK_PROGRESS: (
    homework_id: number,
    student_id: string,
    question_id: number
  ) =>
    `${BASE_URL}/homework/${homework_id}/student/${student_id}/question/${question_id}`,
  SERVER_TIME: `${BASE_URL}/configuration/time`,
  CLASS_HOMEWORK: (class_id: string, startDate: Date, endDate?: Date) =>
    `${BASE_URL}/class/${class_id}/homework?startDate=${formatDateString(
      startDate
    )}${endDate ? `&endDate=${formatDateString(endDate)}` : ''}`,
  INCOMING_CHALLENGE: (id_class: string, id_student: string) =>
    `${BASE_URL}/challenge/class/${id_class}/student/${id_student}/incoming_challenge`,
  MODULE_GRAPH: (class_id: string, i: number) =>
    `${BASE_URL}/class/${class_id}/module_${i === 1 ? 'average' : 'progress'}`,
  CHALLENGE_GRAPH: (class_id: string, i: number) =>
    `${BASE_URL}/class/${class_id}/challenge_${
      i === 3 ? 'average' : 'progress'
    }`,
  LEADERBOARD: (class_id: string) =>
    `${BASE_URL}/class/${class_id}/leaderboard`,
  STUDENT_PROGRESS: (class_id: string, student_id: string) =>
    `${BASE_URL}/class/${class_id}/student/${student_id}/progress`,
  CLASS_PROGRESS: (class_id: string, teacher_id: string) =>
    `${BASE_URL}/class/${class_id}/teacher/${teacher_id}/progress`,
  MODULE_PROGRESS: (class_id: string) =>
    `${BASE_URL}/class/${class_id}/module_progress`,
  CHALLENGE_QUESTIONS: (challenge_id: string, student_id: string) =>
    `${BASE_URL}/challenge/${challenge_id}/student/${student_id}/questions`,
  SAVE_CHALLENGE: (student_id: string, question_id: number) =>
    `${BASE_URL}/challenge/student/${student_id}/question/${question_id}`,
  ALL_STUDENT_HOMEWORKS: (student_id: string) =>
    `${BASE_URL}/student/${student_id}/homeworks`,
  ALL_TEACHER_HOMEWORKS: (teacher_id: string) =>
    `${BASE_URL}/teacher/${teacher_id}/homeworks`,
  UPDATE_HOMEWORK_OUT_FOCUS: (homework_id: string, student_id: string) =>
    `${BASE_URL}/homework/${homework_id}/student/${student_id}/update_time`,
  CHALLENGE_SUBMIT: `${BASE_URL}/challenge/submit`,
  HOMEWORK_SUBMIT: `${BASE_URL}/homework/submit`,
  STUDENT_CLASS_HOMEWORK: (class_id: string, student_id: string) =>
    `${BASE_URL}/class/${class_id}/student/${student_id}/homeworks`,
  UPDATE_CHALLENGE_STATUS_CONTINUE: `${BASE_URL}/challenge/update_status_continue`,
  UPDATE_CHALLENGE_STATUS_FINISHED: `${BASE_URL}/challenge/update_status_start`,
  HOMEWORK_RESULT: (hw_id: number) =>
    `${BASE_URL}/homework/${hw_id}/student_scores`,
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
): Promise<HomeworkQuestionPoolPromise> => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(
    ENDPOINTS.HOMEWORK_QUESTIONS_DIFFICULTY(subject_id, difficulty),
    options
  );

  return request.json();
};

// ====== QUESTIONS FROM A HOMEWORK =======

export const getQuestionFromHomework = async (
  auth_token: string,
  id_homework: string,
  id_student: string
): Promise<HomeworkQuestionsPromise> => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(
    ENDPOINTS.HOMEWORK_QUESTIONS(id_homework, id_student),
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

  const request = await fetch(ENDPOINTS.SUBJECT_MODULES(subject_id), options);

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

/// Run Code
export const executeCode = async (
  auth_token: string,
  code: any
): Promise<CompiledCodeResultsPromise> => {
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(code),
  };

  const request = await fetch(ENDPOINTS.EXECUTE_CODE, options);

  return request.json();
};

// GET SERVER TIME
export const getServerTime = async (
  auth_token: string
): Promise<ServerTimePromise> => {
  const request = await fetch(ENDPOINTS.SERVER_TIME, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return request.json();
};

// Save homework progress
export const saveHomeworkProgress = async (
  auth_token: string,
  homework_id: number,
  question_id: number,
  student_id: string,
  user_input: number | OpenQuestionSolution
): Promise<TypePromise<string>> => {
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      user_input,
    }),
  };

  const request = await fetch(
    ENDPOINTS.SAVE_HOMEWORK_PROGRESS(homework_id, student_id, question_id),
    options
  );

  return request.json();
};

// GET CLASS HOMEWORK
export const getClassHomeworkList = async (
  auth_token: string,
  class_id: string,
  startDate: Date,
  endDate?: Date
): Promise<HomeworkPromise> => {
  const request = await fetch(
    ENDPOINTS.CLASS_HOMEWORK(class_id, startDate, endDate),
    {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }
  );

  return request.json();
};

// GET INCOMIG CHALLENGE
export const getIncomingChallenge = async (
  auth_token: string,
  class_id: string,
  student_id: string
): Promise<TypePromise<Challenge | {}>> => {
  const request = await fetch(
    ENDPOINTS.INCOMING_CHALLENGE(class_id, student_id),
    {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }
  );

  return request.json();
};

// GET LEADERBOARD
export const getLeaderboard = async (
  auth_token: string,
  class_id: string
): Promise<LeaderboardPromise> => {
  const request = await fetch(ENDPOINTS.LEADERBOARD(class_id), {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return request.json();
};

// GET STUDENT PROGRESS
export const getStudentProgress = async (
  auth_token: string,
  class_id: string,
  student_id: string
): Promise<TypePromise<number>> => {
  const request = await fetch(
    ENDPOINTS.STUDENT_PROGRESS(class_id, student_id),
    {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }
  );

  return request.json();
};

// GET CLASS PROGRESS
export const getClassProgress = async (
  auth_token: string,
  class_id: string,
  teacher_id: string
): Promise<TypePromise<number>> => {
  const request = await fetch(ENDPOINTS.CLASS_PROGRESS(class_id, teacher_id), {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return request.json();
};

// GET CLASS MODULE PROGRESS
export const getModuleProgress = async (
  auth_token: string,
  class_id: string
): Promise<ModuleProgressListPromise> => {
  const request = await fetch(ENDPOINTS.MODULE_PROGRESS(class_id), {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return request.json();
};

// ====== QUESTIONS FROM A CHALLENGE =======

export const getQuestionFromChallenge = async (
  auth_token: string,
  id_challenge: string,
  id_student: string
): Promise<ChallengeQuestionsPromise> => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  };

  const request = await fetch(
    ENDPOINTS.CHALLENGE_QUESTIONS(id_challenge, id_student),
    options
  );

  return request.json();
};

// Save homework progress
export const saveChallengeProgress = async (
  auth_token: string,
  student_id: string,
  question_id: number,
  user_input: number | OpenQuestionSolution
): Promise<TypePromise<string>> => {
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      user_input,
    }),
  };

  const request = await fetch(
    ENDPOINTS.SAVE_CHALLENGE(student_id, question_id),
    options
  );

  return request.json();
};

// Get all student homework
export const getAllStudentHomeworks = async (
  auth_token: string,
  student_id: string
): Promise<StudentAllHomeworksPromise> => {
  const request = await fetch(ENDPOINTS.ALL_STUDENT_HOMEWORKS(student_id), {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return request.json();
};

// Get all teacher homework
export const getAllTeacherHomeworks = async (
  auth_token: string,
  teacher_id: string
): Promise<StudentAllHomeworksPromise> => {
  const request = await fetch(ENDPOINTS.ALL_TEACHER_HOMEWORKS(teacher_id), {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return request.json();
};

// Update homework out of focus
export const updateOutOfFocusHomework = async (
  auth_token: string,
  student_id: string,
  homework_id: string,
  time: number
): Promise<string> => {
  const request = await fetch(
    ENDPOINTS.UPDATE_HOMEWORK_OUT_FOCUS(homework_id, student_id),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify({
        added_time: time,
      }),
    }
  );

  return request.json();
};

export const submitHomework = async (
  auth_token: string,
  answers: {
    [key: number]: number | OpenQuestionSolution;
  },
  homework: HomeworkQuestions,
  student_id: string,
  homework_id: string
): Promise<HomeworkSubmitPromise> => {
  const homeworkAnswers = homework.homeworks.map((question, index) => {
    if (question.type === 'open') {
      question.source_code = (answers[index] as OpenQuestionSolution).code;
    } else {
      question.selected_choice = answers[index] as number;
    }
    return question;
  });

  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      student_id,
      questions: [...homeworkAnswers],
      homework_id,
    }),
  };

  const request = await fetch(ENDPOINTS.HOMEWORK_SUBMIT, options);

  return request.json();
};

export const submitChallenge = async (
  auth_token: string,
  answers: {
    [key: number]: number | OpenQuestionSolution;
  },
  challenge: ChallengeQuestions,
  student_id: string,
  challenge_id: string
): Promise<ChallengeSubmitPromise> => {
  const challengeAnswers = challenge.challenges.map((question, index) => {
    if (question.type === 'open') {
      question.source_code = (answers[index] as OpenQuestionSolution).code;
    } else {
      question.selected_choice = answers[index] as number;
    }
    return question;
  });

  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      student_id,
      questions: [...challengeAnswers],
      challenge_id,
    }),
  };

  const request = await fetch(ENDPOINTS.CHALLENGE_SUBMIT, options);

  return request.json();
};

export const getStudentClassHomeworks = async (
  auth_token: string,
  class_id: string,
  student_id: string
): Promise<StudentClassHomeworksPromise> => {
  const request = await fetch(
    ENDPOINTS.STUDENT_CLASS_HOMEWORK(class_id, student_id),
    {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }
  );

  return request.json();
};

export const updateChallengeStatusContinue = async (
  auth_token: string,
  challenge_id: number,
  student_id: string
): Promise<TypePromise<string>> => {
  const request = await fetch(ENDPOINTS.UPDATE_CHALLENGE_STATUS_CONTINUE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      challenge_id,
      student_id,
    }),
  });

  return request.json();
};

export const updateChallengeStatusFinished = async (
  auth_token: string,
  challenge_id: number,
  student_id: string
): Promise<TypePromise<string>> => {
  const request = await fetch(ENDPOINTS.UPDATE_CHALLENGE_STATUS_FINISHED, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      challenge_id,
      student_id,
    }),
  });

  return request.json();
};

// =========== GET HOMEWORK RESULTS ============
export const getHomeworkResults = async (
  auth_token: string,
  homework_id: number
): Promise<HomeworkResultPromise> => {
  const request = await fetch(ENDPOINTS.HOMEWORK_RESULT(homework_id), {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return request.json();
};
