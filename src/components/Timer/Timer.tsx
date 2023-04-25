import React, {useState} from 'react'
import style from './Timer.module.css'

type Props = {
  seconds: number;
}

function formatTime(time: number) {
  if (time >= 1) {
    if (time <= 9) return `0${time}`;
    return String(time);
  }
  return "00";
}

function getTime(givenSeconds : number) {
  let calculatedSeconds = givenSeconds;
  const calculatedHours = parseInt(String(calculatedSeconds / 3600), 10);
  const hours = formatTime(calculatedHours);
  calculatedSeconds -= calculatedHours * 3600;
  const calculatedMinutes = parseInt(String(calculatedSeconds / 60), 10);
  const minutes = formatTime(calculatedMinutes);
  calculatedSeconds -= calculatedMinutes * 60;
  const seconds = formatTime(calculatedSeconds)
  return `${hours}:${minutes}:${seconds}`;
}

export default function Timer({seconds}: Props) {
  const time = getTime(seconds);
  const [isShown, setIsShown] = useState<boolean>(true);
  if (isShown) {
    return (
      <div className={style.timer} onClick={() => setIsShown(false)} role='button' tabIndex={0} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setIsShown(true);
        }
      }}>
        <p className={style.time}>{time}</p>
        <p className={style['timer-action']}> Ocultar tiempo</p>
      </div>
    )
  }
  return (
    <div className={style.timer} onClick={() => setIsShown(true)} role='button' tabIndex={0} onKeyDown={(e) => {
      if (e.key === 'Enter') {
        setIsShown(true);
      }
    }}>
      <p className={style['timer-action']}>Mostrar tiempo</p>
    </div>
  )
}