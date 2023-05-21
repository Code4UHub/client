import React, { useState, useEffect, useRef } from 'react';
import CodeQuestion from 'components/CodeQuestion/CodeQuestion';
import AssignmentHeader from 'components/AssignmentHeader/AssginmentHeader';
import CloseQuestion from 'components/CloseQuestion/CloseQuestion';
import { Button } from 'components/Button/Button';
import Timer from 'components/Timer/Timer';
import { Toast, toastTime } from 'components/Toast/Toast';
import { useIndex } from 'hooks/useIndex';
import { ClosedQuestion } from 'types/Questions/CloseQuestion';

import { questionData } from './questionData';
import style from './Assignment.module.css';

// Translate rems to pixels, as needed to move container with buttons
function getTranslatedPixels(rems: number) {
  const fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rems * fontSize;
}

type CodeAnswer = {
  isCorrect: boolean;
  code: string | null;
};

export default function Assignment() {
  const { index, next, prev, jumpTo, setMaxIndex, max } = useIndex({
    initial: 0,
  });
  const [answers, setAnswers] = useState<{
    [key: number]: number | CodeAnswer;
  }>({});
  // Seconds on complete assignment
  const [seconds, setSeconds] = useState<number>(0);
  // Seconds per question
  const [timeRegistry, setTimeRegistry] = useState<{ [key: number]: number }>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ [key: string]: string }>(
    {}
  );
  // Only after all questions have been answered is submission enabled
  const allQuestionsAnswered = !Object.values(answers).every((answer) => {
    if (typeof answer === 'number') {
      return answer !== -1;
    }
    return (answer as CodeAnswer).isCorrect;
  });
  const hasToastMessage =
    toastMessage.title !== '' && toastMessage.message !== '';
  // const maxIndex = questionData.length - 1;
  const containerSelectQuestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMaxIndex(questionData.length - 1);
  }, [setMaxIndex]);

  useEffect(() => {
    questionData.forEach((question, i) => {
      if (question.type === 'open') {
        setAnswers((ans) => ({
          ...ans,
          [i]: { isCorrect: false, code: null },
        }));
      } else {
        setAnswers((ans) => ({ ...ans, [i]: -1 }));
      }

      setTimeRegistry((times) => ({ ...times, [i]: 0 }));
    });
    setToastMessage({
      title: '',
      message: '',
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isSubmitted) setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSubmitted, seconds]);

  // Update values on answer registry for ClosedQuestions
  const onChooseAnswer = (i: number, option: number) => {
    setAnswers((ans) => ({ ...ans, [i]: option }));
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
      [i]: { ...(ans[i] as CodeAnswer), code: newCode },
    }));
  };

  const updateCodeCorrect = (i: number, value: boolean) => {
    setAnswers((ans) => ({
      ...ans,
      [i]: { ...(ans[i] as CodeAnswer), isCorrect: value },
    }));
  };

  const turnOffToast = () => {
    setTimeout(() => {
      setToastMessage({
        title: '',
        message: '',
      });
    }, toastTime);
  };

  // On Submit Assignment
  const onSubmitAssignment = () => {
    // Update time of that last question
    const timeOnQuestion = timeOnAllQuestions();
    setTimeRegistry((registry) => ({
      ...registry,
      [index]: registry[index] + timeOnQuestion,
    }));
    setToastMessage({
      title: 'Success',
      message: 'Exam completed!',
    });
    setIsSubmitted(true);
    turnOffToast();
  };

  function defineButtonClass(value: number) {
    // Currently viewed question
    if (value === index) return 'assignmentActive';
    // Question is a multiple choice
    if (typeof answers[value] === 'number') {
      // Question is answered
      if (answers[value] !== -1) return 'assignmentAnswered';
    } else if ((answers[value] as CodeAnswer)?.isCorrect)
      return 'assignmentAnswered';
    // Unanswered question
    return 'assignmentInactive';
  }

  function defineButtonText(i: number) {
    const tickString = '\u2713';
    const numberString = String(i + 1);

    if (typeof answers[i] === 'number') {
      return answers[i] !== -1 ? tickString : numberString;
    }

    return (answers[i] as CodeAnswer)?.isCorrect ? tickString : numberString;
  }

  return (
    <main className={style['assignment-container']}>
      {hasToastMessage && (
        <Toast
          title={toastMessage.title}
          message={toastMessage.message}
          type="success"
        />
      )}
      <div className={style.assignment}>
        <AssignmentHeader
          title="Condicionales"
          onClickButton={onSubmitAssignment}
          isButtonDisabled={allQuestionsAnswered}
        />
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
              {questionData.map((q, i) => (
                <Button
                  key={`${q.id}-button`}
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
            questionData[index].type === 'open' ? style.code : ''
          }`}
        >
          {questionData[index].type === 'closed' ? (
            <CloseQuestion
              rightAnswer={
                isSubmitted
                  ? (questionData[index] as ClosedQuestion).answer
                  : -1
              }
              isSubmitted={isSubmitted}
              questionIndex={index}
              onChoose={onChooseAnswer}
              chosenAnswer={answers[index] as number}
              questionData={questionData[index]}
              options={(questionData[index] as ClosedQuestion).options}
            />
          ) : (
            <CodeQuestion
              updateCorrect={updateCodeCorrect}
              questionIndex={index}
              cachedData={answers[index]}
              questionData={questionData[index]}
              updateCode={updateCode}
            />
          )}
        </div>
      </div>
    </main>
  );
}
