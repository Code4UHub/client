import React, {useState} from 'react'
import style from './Timer.module.css'

type Props = {
  s: number;
  min: number;
  hr: number;
}

export default function Timer({s, min, hr}: Props) {
  const seconds = s > 9 ? String(s) : `0${s}`;
  const minutes = min > 9 ? String(min) : `0${min}`;
  const hours = hr > 9 ? String(hr) : `0${hr}`;
  const [isShown, setIsShown] = useState<boolean>(true);
  if (isShown) {
    return (
      <div className={style.timer} onClick={() => setIsShown(false)} role='button' tabIndex={0} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setIsShown(true);
        }
      }}>
        <p className={style.time}>{`${hours}:${minutes}:${seconds}`}</p>
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