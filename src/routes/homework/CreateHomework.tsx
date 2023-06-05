import React, { useReducer, useMemo, useRef } from 'react';
import { Link, useParams, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToast } from 'store/toast/toastSlice';

import SectionHeader from 'components/SectionHeader/SectionHeader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import QuestionCard from 'components/QuestionCard/QuestionCard';
import HomeworkQuestionListTable from 'components/HomeworkQuestionListTable/HomeworkQuestionListTable';

import { ListItem } from 'types/ListItem/ListItem';
import {
  HomeworkQuestion,
  HomeworkQuestionList as HomeworkQuestionListType,
} from 'types/Questions/Question';

import { correctState } from 'utils/inputRules/generalRules';
import { createHomeworkRules } from 'utils/inputRules/createHomeworkRules';

import { formatDifficulty } from 'utils/format/formatDifficulty';

import {
  INITIAL_HOMEWORK,
  homeworkRequestReducer,
  QuestionDifficulty,
} from './reducers/homeworkReducer';
import {
  INITIAL_INPUT_ERRORS,
  inputErrorsReducer,
} from './reducers/inputErrors';

import { ReactComponent as IconBack } from './ArrowBack.svg';
import styles from './CreateHomework.module.css';

export default function CreateHomework() {
  const formRef = useRef<HTMLFormElement>(null);

  const { id, difficulty } = useParams();
  const toastDispatch = useDispatch();
  const data = useLoaderData() as {
    class: ListItem;
    questionListDb: HomeworkQuestionListType;
  };

  const [homeworkRequest, homeworkRequestDispatch] = useReducer(
    homeworkRequestReducer,
    INITIAL_HOMEWORK(
      id ? data.class : undefined,
      Number(difficulty) as QuestionDifficulty
    )
  );

  const [inputErrors, inputErrorsDispatch] = useReducer(
    inputErrorsReducer,
    INITIAL_INPUT_ERRORS
  );

  const numberOfQuestions = useMemo(
    () =>
      homeworkRequest.questions.reduce(
        (acc, question) => {
          if (question.type === 'open') {
            acc.open += 1;
          } else {
            acc.closed += 1;
          }

          return acc;
        },
        { open: 0, closed: 0 }
      ),
    [homeworkRequest.questions]
  );

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

  const addQuestion = (question: HomeworkQuestion) => {
    homeworkRequestDispatch({
      type: 'questions',
      payload: [...homeworkRequest.questions, question],
    });
  };

  const removeQuestion = (questionId: number) => {
    const newQuestionList = [...homeworkRequest.questions].filter(
      (question) => question.question_h_id !== questionId
    );

    homeworkRequestDispatch({ type: 'questions', payload: newQuestionList });
  };

  const resetValues = () => {
    inputErrorsDispatch({
      type: 'reset',
      payload: INITIAL_INPUT_ERRORS,
    });
    homeworkRequestDispatch({
      type: 'reset',
      payload: INITIAL_HOMEWORK(
        id ? data.class : undefined,
        Number(difficulty) as QuestionDifficulty
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

  const questionNodes = homeworkRequest.questions.map((question) => (
    <li key={question.question_h_id}>
      <QuestionCard
        question={question}
        onDelete={removeQuestion}
      />
    </li>
  ));

  return (
    <>
      <SectionHeader
        title={`Crear Tarea ${formatDifficulty(
          Number(difficulty) as QuestionDifficulty
        )}`}
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
            <InputField
              label="Clase"
              type="text"
              id="class_id"
              required
              className={`${styles.input} ${styles.autocomplete}`}
              error=""
              value=""
              defaultValue={`[${data.class.id}] - ${data.class.value}`}
              handleBlur={() => {}}
              handleChange={() => {}}
              readOnly
            />
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
            <div className={styles['number-of-questions']}>
              {`${numberOfQuestions.open + numberOfQuestions.closed} Preguntas`}
            </div>
          </div>
          <div className={styles['question-container']}>{questionNodes}</div>
        </div>
      </div>
      <div>
        <div className={styles['header-container']}>
          <span className={styles.header}>Selección de Preguntas</span>
        </div>
        <div className={styles['question-selector-container']}>
          <HomeworkQuestionListTable
            questionList={data.questionListDb}
            selectedQuestions={homeworkRequest.questions}
            onChecked={addQuestion}
            onUnchecked={removeQuestion}
          />
        </div>
      </div>
    </>
  );
}
