interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserPromise {
  status: 'success' | 'failed';
}

export interface Student extends User {
  student_id: string;
}

export interface Teacher extends User {
  teacher_id: string;
}

export interface StudentPromise extends UserPromise {
  data: Student;
}

export interface TeacherPromise extends UserPromise {
  data: Teacher;
}
