import React, {useState, useEffect} from 'react';
import Title from 'components/Title/Title';
import CloseQuestion from 'components/CloseQuestion/CloseQuestion';
import Button from 'components/Button/Button';
import Timer from 'components/Timer/Timer';
import { Toast, toastTime } from 'components/Toast/Toast';
import { questionData } from './questionData';

import style from './Assignment.module.css';

export default function Assignment() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [time, setTime] = useState<{ [key: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ [key: string]: string }>({});
  const allQuestionsAnswered = !Object.values(answers).every((answer) => answer !== -1);
  const hasToastMessage = toastMessage.title !== "" && toastMessage.message !== "";
  const maxIndex = questionData.length - 1;

  useEffect(() => {
    function updateTime() {
      setTime((currentTime) => ({...currentTime, 'seconds': currentTime.seconds + 1}));
      if (time.minutes === 59 && time.seconds === 59 ) {
        setTime((currentTime) => ({'seconds': 0, 'minutes': 0, 'hours': currentTime.hours + 1}));
      }
      else if (time.seconds === 59) {
        setTime((currentTime) => ({...currentTime, 'minutes': currentTime.minutes + 1, 'seconds': 0}));
      }
    }
    const timeoutId = setTimeout(() => {
      updateTime();
    }, 1000);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);


  useEffect(() => {
    questionData.forEach((_question, index) => {
      setAnswers((ans) => ({...ans, [index]: -1}))
    })
    setToastMessage({
      title: "",
      message: ""
    })
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  }, [])



  const onChooseAnswer = (index: number, option: number) => {
    setAnswers((ans) => ({...ans, [index]: option}))
  }

  function onClickHandler(action: string, newIndex?: number) {
    if (action === "next" && questionIndex < maxIndex) {
      setQuestionIndex((index) => index + 1);
    }
    if (action === "previous" && questionIndex > 0) {
      setQuestionIndex((index) => index - 1);
    }
    if (action === "jump") {
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
          <div className={style['select-question-container']}>
            {questionData.map((_, index) => (
              <Button 
                location={defineButtonClass(index)}
                text={String(index + 1)}
                onClickHandler={() => onClickHandler("jump", index)}
                type="button"
                isDisable={false}
              />
            ))}
          </div>
            <Timer hr={time.hours} min={time.minutes} s={time.seconds}/>
        </div>
        <div className={style['question-container']}>
          <CloseQuestion
            questionIndex={questionIndex}
            onChoose={onChooseAnswer}
            answer={answers[questionIndex]}
            description = {questionData[questionIndex].description}
            options = {questionData[questionIndex].options}
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