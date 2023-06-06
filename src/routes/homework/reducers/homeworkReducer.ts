import { HomeworkRequest } from 'types/Homework/Homework';
import { ListItem } from 'types/ListItem/ListItem';
import {
  HomeworkQuestionList,
  QuestionDifficulty,
} from 'types/Questions/Question';

export type ClassId = Pick<ListItem, 'value'> & { id: string };

export const INITIAL_HOMEWORK = (
  class_id: ClassId | undefined,
  difficulty: QuestionDifficulty
): HomeworkRequest => ({
  class_id: class_id || '',
  difficulty_id: difficulty,
  title: '',
  open_questions: undefined,
  closed_questions: undefined,
  deadline: '',
  questions: [],
});

type UpdateClass = { type: 'class'; payload: string | ClassId };
type UpdateDifficulty = { type: 'difficulty'; payload: QuestionDifficulty };
type UpdateTitle = { type: 'title'; payload: string };
type UpdateOpenQuestions = { type: 'open_questions'; payload: number };
type UpdateClosedQuestions = { type: 'closed_questions'; payload: number };
type UpdateDeadline = { type: 'deadline'; payload: string };
type UpdateQuestions = { type: 'questions'; payload: HomeworkQuestionList };
type ResetHomework = { type: 'reset'; payload: HomeworkRequest };
type ReducerActions =
  | UpdateClass
  | UpdateDifficulty
  | UpdateTitle
  | UpdateOpenQuestions
  | UpdateClosedQuestions
  | UpdateDeadline
  | UpdateQuestions
  | ResetHomework;

export function homeworkRequestReducer(
  state: HomeworkRequest,
  action: ReducerActions
): HomeworkRequest {
  switch (action.type) {
    case 'class':
      return { ...state, class_id: action.payload };

    case 'title':
      return { ...state, title: action.payload };

    case 'open_questions':
      return { ...state, open_questions: action.payload };

    case 'closed_questions':
      return { ...state, closed_questions: action.payload };

    case 'deadline':
      return { ...state, deadline: action.payload };

    case 'questions':
      return { ...state, questions: action.payload };

    case 'reset':
      return { ...action.payload };

    default:
      return state;
  }
}
