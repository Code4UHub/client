export const INITIAL_INPUT_ERRORS = {
  class_id: '',
  difficulty_id: '',
  title: '',
  open_questions: '',
  closed_questions: '',
  deadline: '',
  questions_ids: '',
};

type InputErrors = typeof INITIAL_INPUT_ERRORS;

type UpdateInputError = {
  type: 'update';
  payload: { [Key in keyof InputErrors]?: string };
};
type ResetInputErrors = { type: 'reset'; payload: InputErrors };
type InputErrorActions = UpdateInputError | ResetInputErrors;

export function inputErrorsReducer(
  state: InputErrors,
  action: InputErrorActions
) {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    case 'reset':
      return { ...action.payload };
    default:
      return state;
  }
}
