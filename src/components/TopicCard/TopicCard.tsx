import React, { useState } from 'react';

import Card from 'components/Card/Card';
import { Topic } from 'types/Topic/Topic';
import ProgressBar from 'components/ProgressBar/ProgressBar';

import style from './TopicCard.module.css';

type Props = {
  data: Topic;
};

export default function TopicCard({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={style.container}>
      <Card className={style.card}>
        <span className={style.title}>
          {data.topic_id} {data.title}
        </span>
        <ProgressBar
          percentage={data.percentage}
          textPosition="up"
          textAdded="completado"
        />
        <button
          className={style.button}
          type="button"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? 'Cerrar' : 'Abrir'}
        </button>
      </Card>
      {/* {isOpen && (
                {(data.challenges).map(challenge) => {
                    
                }}
            )} */}
    </div>
  );
}
