import React, { useState, useEffect, useRef } from 'react';
import CodeQuestion from 'components/CodeQuestion/CodeQuestion';
import AssignmentHeader from 'components/AssignmentHeader/AssginmentHeader';
import CloseQuestion from 'components/CloseQuestion/CloseQuestion';
import { Button } from 'components/Button/Button';
import Timer from 'components/Timer/Timer';
import { Toast, toastTime } from 'components/Toast/Toast';
import { questionData } from './questionData';

import style from './Assignment.module.css';

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
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    [key: number]: number | CodeAnswer;
  }>({});
  const [generalSeconds, setGeneralSeconds] = useState<number>(0);
  const [timeRegistry, setTimeRegistry] = useState<{ [key: number]: number }>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const allQuestionsAnswered = !Object.values(answers).every((answer) => {
    if (typeof answer === 'number') {
      return answer !== -1;
    }

    return (answer as CodeAnswer).isCorrect;
  });
  const hasToastMessage =
    toastMessage.title !== '' && toastMessage.message !== '';
  const maxIndex = questionData.length - 1;
  const containerSelectQuestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    questionData.forEach((question, index) => {
      if (question.type === 'open') {
        setAnswers((ans) => ({
          ...ans,
          [index]: { isCorrect: false, code: null },
        }));
      } else {
        setAnswers((ans) => ({ ...ans, [index]: -1 }));
      }

      setTimeRegistry((times) => ({ ...times, [index]: 0 }));
    });
    setToastMessage({
      title: '',
      message: '',
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isSubmitted) setGeneralSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSubmitted, generalSeconds]);

  const onChooseAnswer = (index: number, option: number) => {
    setAnswers((ans) => ({ ...ans, [index]: option }));
  };

  // The total time - sum of time on registry, gives the time on an untracked question
  function timeOnAllQuestions(): number {
    const totalTime = Object.values(timeRegistry).reduce(
      (sum, value) => sum + value,
      0
    );
    return generalSeconds - totalTime;
  }

  function onClickHandler(action: string, newIndex?: number) {
    const container = containerSelectQuestionRef.current;
    const timeOnQuestion = timeOnAllQuestions();
    setTimeRegistry((registry) => ({
      ...registry,
      [questionIndex]: registry[questionIndex] + timeOnQuestion,
    }));
    if (action === 'next' && questionIndex < maxIndex) {
      if (container) container.scrollLeft += getTranslatedPixels(5);
      setQuestionIndex((index) => index + 1);
    }
    if (action === 'previous' && questionIndex > 0) {
      if (container) container.scrollLeft -= getTranslatedPixels(5);
      setQuestionIndex((index) => index - 1);
    }
    if (action === 'jump') {
      if (container)
        container.scrollLeft += getTranslatedPixels(
          ((newIndex || maxIndex) - questionIndex) * 5
        );
      setQuestionIndex(newIndex || 0);
    }
  }

  const updateCode = (newCode: string, index: number) => {
    setAnswers((ans) => ({
      ...ans,
      [index]: { ...(ans[index] as CodeAnswer), code: newCode },
    }));
  };

  const updateCodeCorrect = (index: number, value: boolean) => {
    setAnswers((ans) => ({
      ...ans,
      [index]: { ...(ans[index] as CodeAnswer), isCorrect: value },
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

  const onMainClick = () => {
    const timeOnQuestion = timeOnAllQuestions();
    setTimeRegistry((registry) => ({
      ...registry,
      [questionIndex]: registry[questionIndex] + timeOnQuestion,
    }));
    setToastMessage({
      title: 'Success',
      message: 'Exam completed!',
    });
    setIsSubmitted(true);
    turnOffToast();
  };

  function defineButtonClass(index: number) {
    if (index === questionIndex) return 'assignmentActive';

    if (typeof answers[index] === 'number') {
      if (answers[index] !== -1) return 'assignmentAnswered';
    } else if ((answers[index] as CodeAnswer)?.isCorrect)
      return 'assignmentAnswered';

    return 'assignmentInactive';
  }

  function defineButtonText(index: number) {
    const tickString = '\u2713';
    const numberString = String(index + 1);

    if (typeof answers[index] === 'number') {
      return answers[index] !== -1 ? tickString : numberString;
    }

    return (answers[index] as CodeAnswer)?.isCorrect
      ? tickString
      : numberString;
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
          onClickButton={onMainClick}
          isButtonDisabled={allQuestionsAnswered}
        />
        <div className={style['assignment-info']}>
          <Button
            location="assignmentChange"
            text="<"
            onClickHandler={() => onClickHandler('previous')}
            type="button"
            isDisable={questionIndex === 0}
          />
          <div
            ref={containerSelectQuestionRef}
            className={style['select-question-container']}
          >
            {questionData.map((_, index) => (
              <Button
                location={defineButtonClass(index)}
                text={defineButtonText(index)}
                onClickHandler={() => onClickHandler('jump', index)}
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
            isDisable={questionIndex === maxIndex}
          />
          <Timer seconds={generalSeconds} />
        </div>
        <div
          className={`${style['question-container']} ${
            questionData[questionIndex].type === 'open' ? style.code : ''
          }`}
        >
          {questionData[questionIndex].type === 'closed' ? (
            <CloseQuestion
              rightAnswer={
                isSubmitted
                  ? (questionData[questionIndex].answer as number)
                  : -1
              }
              isSubmitted={isSubmitted}
              questionIndex={questionIndex}
              onChoose={onChooseAnswer}
              chosenAnswer={answers[questionIndex] as number}
              description={questionData[questionIndex].description}
              options={
                questionData[questionIndex].options as {
                  text: string;
                  explanation: string;
                }[]
              }
            />
          ) : (
            <CodeQuestion
              updateCorrect={updateCodeCorrect}
              questionIndex={questionIndex}
              cachedData={answers[questionIndex]}
              questionData={questionData[questionIndex]}
              updateCode={updateCode}
            />
          )}
        </div>
      </div>
    </main>
  );
}
