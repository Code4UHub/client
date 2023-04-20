import style from './Feedback.module.css'

type Props = {
  text: string;
  type: string;
}

export default function Feedback({text, type}: Props) {
  return (
    <span className={style.type}>{text}</span>
  )
}