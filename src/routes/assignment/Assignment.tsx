import React, { useState, useEffect, useRef } from 'react';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { updateToast } from 'store/toast/toastSlice';

import { saveChallengeProgress, saveHomeworkProgress } from 'utils/db/db.utils';
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
  HomeworkQuestions,
  OpenChallengeQuestion,
  OpenHomeworkQuestion,
  OpenQuestionSolution,
  isChallenge,
} from 'types/Questions/Question';

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
        acc[index] = question.solution.user_input || {
          isCorrect: false,
          code: '',
        };
      } else {
        acc[index] =
          typeof question.solution.user_input === 'number'
            ? question.solution.user_input
            : -1;
      }

      return acc;
    }, {} as { [key: number]: number | OpenQuestionSolution });
  }

  const questions = assignment.homeworks;
  return questions.reduce((acc, question, index) => {
    if (question.type === 'open') {
      acc[index] = question.solution.user_input || {
        isCorrect: false,
        code: '',
      };
    } else {
      acc[index] =
        typeof question.solution.user_input === 'number'
          ? question.solution.user_input
          : -1;
    }

    return acc;
  }, {} as { [key: number]: number | OpenQuestionSolution });
}

// TODO: Save Time, and time out of focus
// TODO: Submit Process
export default function Assignment({ assignment }: Props) {
  const questions = isChallenge(assignment)
    ? assignment.challenges
    : assignment.homeworks;

  const user = useSelector((root: RootState) => root.user.currentUser);
  const { assignmentId } = useParams();

  const { index, next, prev, jumpTo, setMaxIndex, max } = useIndex({
    initial: 0,
  });

  const [answers, setAnswers] = useState<{
    [key: number]: number | OpenQuestionSolution;
  }>(initialAnswers(assignment));

  // Seconds on complete assignment
  const [seconds, setSeconds] = useState<number>(
    formatAssignmentTimer(Number(assignment.start_date))
  );
  // Seconds per question
  const [timeRegistry, setTimeRegistry] = useState<{ [key: number]: number }>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSavingProcess, setIsSavingProcess] = useState(false);

  const dispatch = useDispatch();

  // Only after all questions have been answered is submission enabled
  const allQuestionsAnswered = !Object.values(answers).every((answer) => {
    if (typeof answer === 'number') {
      return answer !== -1;
    }
    return (answer as OpenQuestionSolution).isCorrect;
  });

  const containerSelectQuestionRef = useRef<HTMLDivElement>(null);

  // Update the maximum possible index on hook useIndex
  useEffect(() => {
    if (isChallenge(assignment)) {
      setMaxIndex(assignment.challenges.length - 1);
    } else {
      setMaxIndex(assignment.homeworks.length - 1);
    }
  }, [setMaxIndex, assignment]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isSubmitted) setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSubmitted, seconds]);

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

  // Total time on assignemnt - total registry = time on current question
  function timeOnAllQuestions(): number {
    const totalTime = Object.values(timeRegistry).reduce(
      (sum, value) => sum + value,
      0
    );
    return seconds - totalTime;
  }

  // For the buttons that change the question
  function onClickHandler(action: string, newIndex?: number) {
    const container = containerSelectQuestionRef.current;
    const timeOnQuestion = timeOnAllQuestions();
    setTimeRegistry((registry) => ({
      ...registry,
      [index]: registry[index] + timeOnQuestion,
    }));
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
  const onSubmitAssignment = () => {
    // Update time of that last question
    const timeOnQuestion = timeOnAllQuestions();
    setTimeRegistry((registry) => ({
      ...registry,
      [index]: registry[index] + timeOnQuestion,
    }));
    dispatch(
      updateToast({
        title: 'Success',
        message: 'Exam completed!',
        type: 'success',
      })
    );
    setIsSubmitted(true);
  };

  function defineButtonClass(value: number) {
    // Currently viewed question
    if (value === index) return 'assignmentActive';
    // Question is a multiple choice
    if (typeof answers[value] === 'number') {
      // Question is answered
      if (answers[value] !== -1) return 'assignmentAnswered';
    } else if ((answers[value] as OpenQuestionSolution)?.isCorrect)
      return 'assignmentAnswered';
    // Unanswered question
    return 'assignmentInactive';
  }

  function defineButtonText(i: number) {
    const tickString = '\u2713';
    const numberString = String(i + 1);

    if (typeof answers[i] === 'number')
      return answers[i] !== -1 ? tickString : numberString;
    return (answers[i] as OpenQuestionSolution)?.isCorrect
      ? tickString
      : numberString;
  }

  return (
    <div className={style.assignment}>
      <SectionHeader
        title="Examen"
        childType={isSavingProcess ? 'loading' : ''}
      >
        {isSavingProcess && <LoadingSpinner className={style.loading} />}
        <Button
          location="assignmentSubmit"
          text="Terminar examen"
          onClickHandler={onSubmitAssignment}
          type="submit"
          isDisable={allQuestionsAnswered}
        />
      </SectionHeader>
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
              rightAnswer={
                isSubmitted
                  ? (questions[index].question as ClosedQuestion).answer
                  : -1
              }
              isSubmitted={isSubmitted}
              questionIndex={index}
              onChoose={onChooseAnswer}
              chosenAnswer={answers[index] as number}
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
              cachedData={answers[index] as OpenQuestionSolution}
              questionData={
                questions[index] as OpenHomeworkQuestion | OpenChallengeQuestion
              }
              updateCode={updateCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
