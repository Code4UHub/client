import React, { useState, useEffect, useRef } from 'react';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { TOAST_GENERAL_ERRORS, updateToast } from 'store/toast/toastSlice';

import {
  saveChallengeProgress,
  saveHomeworkProgress,
  submitChallenge,
  submitHomework,
  updateChallengeStatusFinished,
} from 'utils/db/db.utils';
import { formatAssignmentTimer } from 'utils/format/formatAssignmentTimer';

import SectionHeader from 'components/SectionHeader/SectionHeader';
import CodeQuestion from 'components/CodeQuestion/CodeQuestion';
import CloseQuestion from 'components/CloseQuestion/CloseQuestion';
import { Button } from 'components/Button/Button';
import Timer from 'components/Timer/Timer';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import { useIndex } from 'hooks/useIndex';

import {
  ChallengeQuestions,
  ClosedChallengeQuestion,
  ClosedHomeworkQuestion,
  ClosedQuestion,
  ClosedSolution,
  HomeworkQuestions,
  OpenChallengeQuestion,
  OpenHomeworkQuestion,
  OpenQuestionSolution,
  OpenSolution,
  isChallenge,
} from 'types/Questions/Question';
import {
  ChallengeSubmitPromise,
  HomeworkSubmitPromise,
} from 'types/Submit/Submit';

import style from './Assignment.module.css';

// Translate rems to pixels, as needed to move container with buttons
function getTranslatedPixels(rems: number) {
  const fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rems * fontSize;
}

type Props = {
  assignment: ChallengeQuestions | HomeworkQuestions;
};

function initialAnswers(assignment: ChallengeQuestions | HomeworkQuestions) {
  if (isChallenge(assignment)) {
    const questions = assignment.challenges;
    return questions.reduce((acc, question, index) => {
      if (question.type === 'open') {
        if ('user_input' in question.solution) {
          acc[index] = question.solution.user_input;
        } else if ('solution' in question.solution) {
          acc[index] = { ...question.solution };
        } else {
          acc[index] = {
            isCorrect: false,
            code: '',
          };
        }
      } else if ('user_input' in question.solution) {
        acc[index] = question.solution.user_input;
      } else if ('solution' in question.solution) {
        acc[index] = { ...question.solution };
      } else {
        acc[index] = -1;
      }

      return acc;
    }, {} as { [key: number]: number | OpenQuestionSolution | ClosedSolution | OpenSolution });
  }

  const questions = assignment.homeworks;
  return questions.reduce((acc, question, index) => {
    if (question.type === 'open') {
      if ('user_input' in question.solution) {
        acc[index] = question.solution.user_input;
      } else if ('solution' in question.solution) {
        acc[index] = { ...question.solution };
      } else {
        acc[index] = {
          isCorrect: false,
          code: '',
        };
      }
    } else if ('user_input' in question.solution) {
      acc[index] = question.solution.user_input;
    } else if ('solution' in question.solution) {
      acc[index] = { ...question.solution };
    } else {
      acc[index] = -1;
    }

    return acc;
  }, {} as { [key: number]: number | OpenQuestionSolution | ClosedSolution | OpenSolution });
}

function isAssignmentPreviouslySubmitted(
  assignment: ChallengeQuestions | HomeworkQuestions
) {
  if (isChallenge(assignment)) {
    return assignment.challenges.every(
      (question) => 'solution' in question.solution
    );
  }

  return assignment.homeworks.every(
    (question) => 'solution' in question.solution
  );
}

export default function Assignment({ assignment }: Props) {
  const questions = isChallenge(assignment)
    ? assignment.challenges
    : assignment.homeworks;

  const isPreviouslySubmitted = isAssignmentPreviouslySubmitted(assignment);

  const user = useSelector((root: RootState) => root.user.currentUser);
  const { assignmentId } = useParams();

  const { index, next, prev, jumpTo, setMaxIndex, max } = useIndex({
    initial: 0,
  });

  const [answers, setAnswers] = useState<{
    [key: number]:
      | number
      | OpenQuestionSolution
      | ClosedSolution
      | OpenSolution;
  }>(initialAnswers(assignment));

  // Seconds on complete assignment
  const [seconds, setSeconds] = useState<number>(
    formatAssignmentTimer(
      Number(assignment.start_date),
      Number(assignment.endDate)
    )
  );

  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    isPreviouslySubmitted
  );
  const [isSavingProcess, setIsSavingProcess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  // Only after all questions have been answered is submission enabled
  const allQuestionsAnswered = !Object.values(answers).every((answer) => {
    if (typeof answer === 'number') {
      return answer !== -1;
    }

    if ('code' in answer) {
      return answer.isCorrect;
    }

    return true;
  });

  const containerSelectQuestionRef = useRef<HTMLDivElement>(null);

  // Detect visibilty change on document
  useEffect(() => {
    let worker: Worker;

    const startTimer = () => {
      if (!isSubmitted) worker.postMessage('start');
    };

    const stopTimer = () => {
      if (!isSubmitted) worker.postMessage('stop');
    };

    if (!isSubmitted) {
      if (!isChallenge(assignment)) {
        worker = new Worker(new URL('./visibilityWorker.ts', import.meta.url));
        worker.postMessage({
          homeworkId: assignmentId,
          studentId: user?.id,
          authToken: user?.authToken,
        });
        window.addEventListener('blur', startTimer);
        window.addEventListener('focus', stopTimer);
      }
    }

    return () => {
      if (!isChallenge(assignment)) {
        if (worker) worker.terminate();
        window.removeEventListener('blur', startTimer);
        window.removeEventListener('focus', stopTimer);
      }
    };
  }, []);

  useEffect(() => {
    let timeWorker: Worker;
    if (!isSubmitted) {
      timeWorker = new Worker(new URL('./timerWorker.ts', import.meta.url));
      timeWorker.postMessage('start');
      timeWorker.onmessage = (e) => {
        if (e.data === 'update') {
          setSeconds((currSeconds) => currSeconds + 1);
        }
      };
    }

    return () => {
      if (isSubmitted && timeWorker) {
        timeWorker.postMessage('stop');
      }

      if (timeWorker) {
        timeWorker.terminate();
      }
    };
  }, [isSubmitted]);

  // Update the maximum possible index on hook useIndex
  useEffect(() => {
    if (isChallenge(assignment)) {
      setMaxIndex(assignment.challenges.length - 1);
    } else {
      setMaxIndex(assignment.homeworks.length - 1);
    }
  }, [setMaxIndex, assignment]);

  // Update values on answer registry for ClosedQuestions
  const onChooseAnswer = async (i: number, option: number | boolean) => {
    if (typeof option === 'number') {
      setAnswers((ans) => ({ ...ans, [i]: option }));
    } else {
      setAnswers((ans) => ({
        ...ans,
        [i]: { ...(ans[i] as OpenQuestionSolution), isCorrect: option },
      }));
    }

    setIsSavingProcess(true);
    try {
      if (!isChallenge(assignment)) {
        await saveHomeworkProgress(
          user?.authToken as string,
          Number(assignmentId),
          assignment.homeworks[i].question_h_id,
          user?.id as string,
          typeof option === 'number'
            ? option
            : { ...(answers[i] as OpenQuestionSolution), isCorrect: option }
        );
      } else {
        await saveChallengeProgress(
          user?.authToken as string,
          user?.id as string,
          assignment.challenges[i].question_id,
          typeof option === 'number'
            ? option
            : { ...(answers[i] as OpenQuestionSolution), isCorrect: option }
        );
      }
    } catch (error) {
      // TODO: Catch Error
    }
    setIsSavingProcess(false);
  };

  // For the buttons that change the question
  function onClickHandler(action: string, newIndex?: number) {
    const container = containerSelectQuestionRef.current;
    if (action === 'next') {
      // If next was successful and container exists
      if (next() && container) {
        container.scrollLeft += getTranslatedPixels(5);
      }
    }
    if (action === 'previous') {
      // If prev was successful and container exists
      if (prev() && container) {
        container.scrollLeft -= getTranslatedPixels(5);
      }
    }
    if (action === 'jump') {
      // JumpTo was succesful and container exists
      if (jumpTo(newIndex as number) && container) {
        container.scrollLeft += getTranslatedPixels(
          ((newIndex as number) - index) * 5
        );
      }
    }
  }

  const updateCode = (newCode: string, i: number) => {
    setAnswers((ans) => ({
      ...ans,
      [i]: { ...(ans[i] as OpenQuestionSolution), code: newCode },
    }));
  };

  // On Submit Assignment
  const onSubmitAssignment = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      let submitResults: HomeworkSubmitPromise | ChallengeSubmitPromise;

      if (isChallenge(assignment)) {
        submitResults = await submitChallenge(
          user?.authToken as string,
          answers as { [key: number]: number | OpenQuestionSolution },
          assignment,
          user?.id as string,
          assignmentId as string
        );
      } else {
        submitResults = await submitHomework(
          user?.authToken as string,
          answers as { [key: number]: number | OpenQuestionSolution },
          assignment,
          user?.id as string,
          assignmentId as string
        );
      }

      if (
        submitResults.status === 'success' &&
        typeof submitResults.data !== 'string'
      ) {
        const newAnswers:
          | { [key: number]: ClosedSolution | OpenSolution }
          | Record<number, never> = {};

        submitResults.data.questions.forEach((question, indexQuestion) => {
          newAnswers[indexQuestion] = question.solution;
        });

        if (isChallenge(assignment)) {
          updateChallengeStatusFinished(
            user?.authToken as string,
            Number(assignmentId),
            user?.id as string
          );
        }

        setAnswers(newAnswers);
        dispatch(
          updateToast({
            title: 'Success',
            message: 'Exam completed!',
            type: 'success',
          })
        );
        setIsSubmitted(true);
        setIsSubmitting(false);
      } else {
        dispatch(
          updateToast({
            title: submitResults.status,
            message: submitResults.data as string,
            type: 'error',
          })
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
    }
  };

  function defineButtonClass(value: number) {
    // Currently viewed question
    if (value === index) return 'assignmentActive';
    // Question is a multiple choice
    if (typeof answers[value] === 'number') {
      // Question is answered
      if (answers[value] !== -1) return 'assignmentAnswered';
    } else if (
      'code' in
        (answers[value] as
          | OpenQuestionSolution
          | ClosedSolution
          | OpenSolution) &&
      (answers[value] as OpenQuestionSolution).isCorrect
    ) {
      return 'assignmentAnswered';
    } else if (
      'solution' in
      (answers[value] as OpenQuestionSolution | ClosedSolution | OpenSolution)
    ) {
      return 'assignmentAnswered';
    }
    // Unanswered question
    return 'assignmentInactive';
  }

  function defineButtonText(i: number) {
    const tickString = '\u2713';
    const numberString = String(i + 1);

    if (typeof answers[i] === 'number') {
      return answers[i] !== -1 ? tickString : numberString;
    }

    if (
      'code' in
      (answers[i] as OpenQuestionSolution | ClosedSolution | OpenSolution)
    ) {
      return (answers[i] as OpenQuestionSolution).isCorrect
        ? tickString
        : numberString;
    }

    return tickString;
  }

  return (
    <div className={style.assignment}>
      <SectionHeader
        title={isChallenge(assignment) ? 'Desafío' : 'Tarea'}
        childType={isSavingProcess ? 'loading' : ''}
      >
        {isSavingProcess && <LoadingSpinner className={style.loading} />}
        {!isSubmitted && (
          <Button
            location="assignmentSubmit"
            text="Terminar examen"
            onClickHandler={onSubmitAssignment}
            type="submit"
            isDisable={allQuestionsAnswered}
          />
        )}
      </SectionHeader>
      {isSubmitting ? (
        <LoadingSpinner />
      ) : (
        <div className={style.assignment}>
          <div className={style['assignment-info']}>
            <Timer seconds={seconds} />
            <div className={style['assignment-button-controllers']}>
              <Button
                location="assignmentChange"
                text="<"
                onClickHandler={() => onClickHandler('previous')}
                type="button"
                isDisable={index === 0}
              />
              <div
                ref={containerSelectQuestionRef}
                className={style['select-question-container']}
              >
                {isChallenge(assignment)
                  ? assignment.challenges.map((q, i) => (
                      <Button
                        key={`${q.question_id}-button`}
                        location={defineButtonClass(i)}
                        text={defineButtonText(i)}
                        onClickHandler={() => onClickHandler('jump', i)}
                        type="button"
                        isDisable={false}
                      />
                    ))
                  : assignment.homeworks.map((q, i) => (
                      <Button
                        key={`${q.question_h_id}-button`}
                        location={defineButtonClass(i)}
                        text={defineButtonText(i)}
                        onClickHandler={() => onClickHandler('jump', i)}
                        type="button"
                        isDisable={false}
                      />
                    ))}
              </div>
              <Button
                location="assignmentChange"
                text=">"
                onClickHandler={() => onClickHandler('next')}
                type="button"
                isDisable={index === max}
              />
            </div>
          </div>
          <div
            className={`${style['question-container']} ${
              questions[index].type === 'open' ? style.code : ''
            }`}
          >
            {questions[index].type === 'closed' ? (
              <CloseQuestion
                key={
                  isChallenge(assignment)
                    ? assignment.challenges[index].question_id
                    : assignment.homeworks[index].question_h_id
                }
                isSubmitted={isSubmitted}
                questionIndex={index}
                onChoose={onChooseAnswer}
                chosenAnswer={
                  typeof answers[index] === 'number'
                    ? (answers[index] as number)
                    : (answers[index] as ClosedSolution).solution
                }
                questionData={
                  questions[index] as
                    | ClosedHomeworkQuestion
                    | ClosedChallengeQuestion
                }
                options={(questions[index].question as ClosedQuestion).options}
              />
            ) : (
              <CodeQuestion
                key={
                  isChallenge(assignment)
                    ? assignment.challenges[index].question_id
                    : assignment.homeworks[index].question_h_id
                }
                updateCorrect={onChooseAnswer}
                questionIndex={index}
                cachedData={
                  answers[index] as OpenSolution | OpenQuestionSolution
                }
                questionData={
                  questions[index] as
                    | OpenHomeworkQuestion
                    | OpenChallengeQuestion
                }
                updateCode={updateCode}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
