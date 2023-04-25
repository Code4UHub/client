import React, { useState, useEffect, useRef } from 'react';
import Title from 'components/Title/Title';
import CloseQuestion from 'components/CloseQuestion/CloseQuestion';
import { Button } from 'components/Button/Button';
import Timer from 'components/Timer/Timer';
import { Toast, toastTime } from 'components/Toast/Toast';
import { questionData } from './questionData';

import style from './Assignment.module.css';

function getTranslatedPixels(rems: number) {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rems * fontSize;
}


export default function Assignment() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [generalSeconds, setGeneralSeconds] = useState<number>(0);
  const [timeRegistry, setTimeRegistry] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ [key: string]: string }>({});
  const allQuestionsAnswered = !Object.values(answers).every((answer) => answer !== -1);
  const hasToastMessage = toastMessage.title !== "" && toastMessage.message !== "";
  const maxIndex = questionData.length - 1;
  const containerSelectQuestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    questionData.forEach((_question, index) => {
      setAnswers((ans) => ({ ...ans, [index]: -1 }));
      setTimeRegistry((times) => ({ ...times, [index]: 0 }))
    });
    setToastMessage({
      title: "",
      message: ""
    });
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isSubmitted) setGeneralSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSubmitted, generalSeconds])


  const onChooseAnswer = (index: number, option: number) => {
    setAnswers((ans) => ({ ...ans, [index]: option }))
  }

  // The total time - sum of time on registry, gives the time on an untracked question
  function timeOnAllQuestions(): number {
    const totalTime = Object.values(timeRegistry).reduce((sum, value) => sum + value, 0);
    return generalSeconds - totalTime;
  }

  function onClickHandler(action: string, newIndex?: number) {

    const container = containerSelectQuestionRef.current;
    const timeOnQuestion = timeOnAllQuestions();
    setTimeRegistry((registry) => ({ ...registry, [questionIndex]: registry[questionIndex] + (timeOnQuestion) }));
    if (action === "next" && questionIndex < maxIndex) {
      if (container) container.scrollLeft += getTranslatedPixels(5);
      setQuestionIndex((index) => index + 1);
    }
    if (action === "previous" && questionIndex > 0) {
      if (container) container.scrollLeft -= getTranslatedPixels(5);
      setQuestionIndex((index) => index - 1);
    }
    if (action === "jump") {
      if (container) container.scrollLeft += getTranslatedPixels(((newIndex || maxIndex) - questionIndex) * 5)
      setQuestionIndex(newIndex || 0);
    }
  }

  const turnOffToast = () => {
    setTimeout(() => {
      setToastMessage({
        title: "",
        message: ""
      });
    }, toastTime)
  }

  const onMainClick = () => {
    const timeOnQuestion = timeOnAllQuestions();
    setTimeRegistry((registry) => ({ ...registry, [questionIndex]: registry[questionIndex] + (timeOnQuestion) }));
    setToastMessage({
      title: "Success",
      message: "Exam completed!"
    })
    setIsSubmitted(true);
    turnOffToast();
  }

  function defineButtonClass(index: number) {
    if (index === questionIndex) return "assignmentActive";
    if (isSubmitted) {
      if (answers[index] === questionData[index].answer) return "assignmentCorrect";
      return "assignmentIncorrect"
    }
    if (answers[index] !== -1) return "assignmentAnswered"
    return "assignmentInactive";
  }

  return (
    <main className={style['assignment-container']}>
      {hasToastMessage &&
        <Toast
          title={toastMessage.title}
          message={toastMessage.message}
          type="success"
        />
      }
      <div className={style.assignment}>
        <Title title="Nivel fácil | Condicionales" />
        <div className={style['assignment-info']}>
          <div ref={containerSelectQuestionRef} className={style['select-question-container']}>
            {questionData.map((_, index) => (
              <Button
                location={defineButtonClass(index)}
                text={answers[index] === -1 ? String(index + 1) : '\u2713'}
                onClickHandler={() => onClickHandler("jump", index)}
                type="button"
                isDisable={false}
              />
            ))}
          </div>
          <Timer
            seconds={generalSeconds}
          />
        </div>
        <div className={style['question-container']}>
          <CloseQuestion
            rightAnswer={isSubmitted ? questionData[questionIndex].answer : -1}
            isSubmitted={isSubmitted}
            questionIndex={questionIndex}
            onChoose={onChooseAnswer}
            chosenAnswer={answers[questionIndex]}
            description={questionData[questionIndex].description}
            options={questionData[questionIndex].options}
          />
          <div className={style['button-container']}>
            <Button
              location="assignmentChange"
              text="Atrás"
              onClickHandler={() => onClickHandler("previous")}
              type="button"
              isDisable={questionIndex === 0}
            />
            <Button
              location="assignmentChange"
              text="Siguiente"
              onClickHandler={() => onClickHandler("next")}
              type="button"
              isDisable={questionIndex === maxIndex}
            />
          </div>
        </div>
        <div className={style['last-button']}>
          <Button
            location="assignmentSubmit"
            text="Terminar examen"
            onClickHandler={onMainClick}
            type="submit"
            isDisable={allQuestionsAnswered}
          />
        </div>
      </div>
    </main>
  )
}