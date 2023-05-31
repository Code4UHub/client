import React, { useReducer, useState, useMemo, useRef } from 'react';
import { Link, useParams, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToast } from 'store/toast/toastSlice';

import SectionHeader from 'components/SectionHeader/SectionHeader';
import { InputField } from 'components/InputField/InputField';
import AutocompleteField, {
  ItemList,
} from 'components/AutocompleteField/AutocompleteField';
import Card from 'components/Card/Card';
import { Button } from 'components/Button/Button';

import { HomeworkRequest } from 'types/Homework/Homework';

import { correctState } from 'utils/inputRules/generalRules';
import { createHomeworkRules } from 'utils/inputRules/createHomeworkRules';
import { Question, questionList } from './dummyData';

import { ReactComponent as IconBack } from './ArrowBack.svg';
import { ReactComponent as IconDelete } from './Delete.svg';
import styles from './CreateHomework.module.css';

type QuestionCardProps = {
  question: Question;
  onDelete: Function;
};

function QuestionCard({ question, onDelete }: QuestionCardProps) {
  return (
    <Card className={styles['question-card']}>
      <span className={styles['question-id']}>{question.id}.</span>
      <div>
        <div className={styles['question-tags']}>
          <span className={`${styles.tag} ${styles.module}`}>
            {question.module}
          </span>
          <span className={`${styles.tag} ${styles.type}`}>
            {question.type}
          </span>
        </div>
        <span
          className={styles['question-title']}
          title={question.title}
        >
          {question.title}
        </span>
      </div>
      <button
        type="button"
        className={styles['question-delete']}
        onClick={() => onDelete(question)}
      >
        <IconDelete />
      </button>
    </Card>
  );
}

const INITIAL_INPUT_ERRORS = {
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

function inputErrorsReducer(state: InputErrors, action: InputErrorActions) {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    case 'reset':
      return { ...action.payload };
    default:
      return state;
  }
}

const INITIAL_HOMEWORK = (
  class_id: ItemList | undefined,
  difficulty: 1 | 2 | 3
): HomeworkRequest => ({
  class_id: class_id || '',
  difficulty_id: difficulty,
  title: '',
  open_questions: undefined,
  closed_questions: undefined,
  deadline: '',
  questions_ids: [...questionList],
});

type UpdateClass = { type: 'class'; payload: string | ItemList };
type UpdateDifficulty = { type: 'difficulty'; payload: 1 | 2 | 3 };
type UpdateTitle = { type: 'title'; payload: string };
type UpdateOpenQuestions = { type: 'open_questions'; payload: number };
type UpdateClosedQuestions = { type: 'closed_questions'; payload: number };
type UpdateDeadline = { type: 'deadline'; payload: string };
type UpdateQuestions = { type: 'questions'; payload: Question[] };
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

function homeworkRequestReducer(
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
      return { ...state, questions_ids: action.payload };

    case 'reset':
      return { ...action.payload };

    default:
      return state;
  }
}

type Props = {
  difficulty: 'Fácil' | 'Media' | 'Díficil';
};

const getDifficultyId = (difficulty: 'Fácil' | 'Media' | 'Díficil') => {
  switch (difficulty) {
    case 'Fácil':
      return 1;
    case 'Media':
      return 2;
    default:
      return 3;
  }
};

export default function CreateHomework({ difficulty }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const { id } = useParams();
  const toastDispatch = useDispatch();
  const data = useLoaderData() as ItemList[] | ItemList;

  const [autocompleteKey, setAutocompleteKey] = useState(0);

  const [homeworkRequest, homeworkRequestDispatch] = useReducer(
    homeworkRequestReducer,
    INITIAL_HOMEWORK(
      id ? (data as ItemList) : undefined,
      getDifficultyId(difficulty)
    )
  );

  const [inputErrors, inputErrorsDispatch] = useReducer(
    inputErrorsReducer,
    INITIAL_INPUT_ERRORS
  );

  const numberOfQuestions = useMemo(
    () =>
      homeworkRequest.questions_ids.reduce(
        (acc, question) => {
          if (question.type === 'Open') {
            acc.open += 1;
          } else {
            acc.closed += 1;
          }

          return acc;
        },
        { open: 0, closed: 0 }
      ),
    [homeworkRequest.questions_ids]
  );

  const autocompleteOnChangeHandler = (item: ItemList | string) => {
    inputErrorsDispatch({ type: 'update', payload: { class_id: '' } });
    homeworkRequestDispatch({
      type: 'class',
      payload: item,
    });
  };

  const onInputChangeHandler = (idInput: string, value: string) => {
    switch (idInput) {
      case 'title':
        inputErrorsDispatch({ type: 'update', payload: { title: '' } });
        homeworkRequestDispatch({
          type: 'title',
          payload: value.replace(/\s+/g, ' ').trim(),
        });
        break;
      case 'open_questions':
        inputErrorsDispatch({
          type: 'update',
          payload: { open_questions: '' },
        });
        homeworkRequestDispatch({
          type: 'open_questions',
          payload: Number(value),
        });
        break;
      case 'closed_questions':
        inputErrorsDispatch({
          type: 'update',
          payload: { closed_questions: '' },
        });
        homeworkRequestDispatch({
          type: 'closed_questions',
          payload: Number(value),
        });
        break;
      case 'date':
        inputErrorsDispatch({ type: 'update', payload: { deadline: '' } });
        homeworkRequestDispatch({ type: 'deadline', payload: value });
        break;
      default:
        console.log(id, value);
    }
  };

  const deleteQuestionNode = (questionNode: Question) => {
    const newQuestionList = [...homeworkRequest.questions_ids].filter(
      (question) => question.id !== questionNode.id
    );

    homeworkRequestDispatch({ type: 'questions', payload: newQuestionList });
  };

  const resetValues = () => {
    setAutocompleteKey((key) => key + 1);
    inputErrorsDispatch({
      type: 'reset',
      payload: INITIAL_INPUT_ERRORS,
    });
    homeworkRequestDispatch({
      type: 'reset',
      payload: INITIAL_HOMEWORK(
        id ? (data as ItemList) : undefined,
        getDifficultyId(difficulty)
      ),
    });
  };

  const checkRules = () => {
    let isValid: boolean = true;

    Object.entries(homeworkRequest).forEach(([key, value]) => {
      if (key in createHomeworkRules) {
        const result = createHomeworkRules[key](value);

        inputErrorsDispatch({ type: 'update', payload: { [key]: result } });

        if (result !== correctState) {
          isValid = false;
        }
      }
    });

    if (
      homeworkRequest.open_questions &&
      homeworkRequest.open_questions > numberOfQuestions.open
    ) {
      isValid = false;
      toastDispatch(
        updateToast({
          title: 'Error',
          type: 'error',
          message: 'No has seleccionada suficientes preguntas abiertas',
        })
      );
    } else if (
      homeworkRequest.closed_questions &&
      homeworkRequest.closed_questions > numberOfQuestions.closed
    ) {
      isValid = false;
      toastDispatch(
        updateToast({
          title: 'Error',
          type: 'error',
          message: 'No has seleccionada suficientes preguntas cerradas',
        })
      );
    }

    return isValid;
  };

  const submitHomework = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (checkRules()) {
      console.log('Submit!!');

      inputErrorsDispatch({
        type: 'reset',
        payload: INITIAL_INPUT_ERRORS,
      });

      resetValues();

      formRef.current?.reset();

      toastDispatch(
        updateToast({
          title: 'Éxito',
          type: 'success',
          message: 'Se ha creado la tarea',
        })
      );

      return;
    }

    inputErrorsDispatch({
      type: 'update',
      payload: { title: createHomeworkRules.title(homeworkRequest.title) },
    });
  };

  const classElement = !id ? (
    <AutocompleteField
      key={autocompleteKey}
      label="Clase"
      id="class_id"
      className={`${styles.input} ${styles.autocomplete}`}
      error={inputErrors.class_id}
      handleBlur={() => {}}
      handleChange={autocompleteOnChangeHandler}
      list={data as ItemList[]}
    />
  ) : (
    <InputField
      label="Clase"
      type="text"
      id="class_id"
      required
      className={`${styles.input} ${styles.autocomplete}`}
      error=""
      value=""
      defaultValue={`[${(data as ItemList).id}] - ${(data as ItemList).value}`}
      handleBlur={() => {}}
      handleChange={() => {}}
      readOnly
    />
  );

  const questionNodes = homeworkRequest.questions_ids.map((question) => (
    <li key={question.id}>
      <QuestionCard
        question={question}
        onDelete={deleteQuestionNode}
      />
    </li>
  ));

  return (
    <>
      <SectionHeader
        title={`Crear Tarea ${difficulty}`}
        childType="backButton"
      >
        <Link
          to="../.."
          relative="path"
          className={styles.icon}
        >
          <IconBack />
        </Link>
      </SectionHeader>
      <div className={styles.container}>
        <form
          className={styles['form-container']}
          ref={formRef}
        >
          <div className={styles['header-container']}>
            <span className={styles.header}>Detalles</span>
          </div>
          <div>
            <InputField
              label="Título"
              type="text"
              id="title"
              required
              className={styles.input}
              error={inputErrors.title}
              value=""
              handleBlur={() => {}}
              handleChange={onInputChangeHandler}
            />
            {classElement}
            <div className={styles['days-container']}>
              <InputField
                label="Preguntas abiertas"
                type="number"
                id="open_questions"
                required
                className={styles.input}
                error={inputErrors.open_questions}
                value=""
                handleBlur={() => {}}
                handleChange={onInputChangeHandler}
              />
              <InputField
                label="Preguntas cerradas"
                type="number"
                id="closed_questions"
                required
                className={styles.input}
                error={inputErrors.closed_questions}
                value=""
                handleBlur={() => {}}
                handleChange={onInputChangeHandler}
              />
            </div>
            <InputField
              label="Fecha Límite"
              type="date"
              id="date"
              required
              className={styles.input}
              error={inputErrors.deadline}
              value=""
              handleBlur={() => {}}
              handleChange={onInputChangeHandler}
            />
          </div>
          <div className={styles['submit-container']}>
            <Button
              onClickHandler={resetValues}
              location="resetHomework"
              text="Limpiar"
              type="reset"
            />
            <Button
              onClickHandler={submitHomework}
              location="createHomework"
              text="Crear Tarea"
              type="submit"
            />
          </div>
        </form>
        <div className={styles.question}>
          <div className={styles['header-container']}>
            <span className={styles.header}>Preguntas</span>
            {/* <div className={styles['add-question-container']}>
              <Button
                onClickHandler={() => {}}
                location="addQuestion"
                text="Añadir Pregunta"
              />
            </div> */}
            <div className={styles['number-of-questions']}>
              {`${numberOfQuestions.open + numberOfQuestions.closed} Preguntas`}
            </div>
          </div>
          <div className={styles['question-container']}>{questionNodes}</div>
        </div>
      </div>
    </>
  );
}
