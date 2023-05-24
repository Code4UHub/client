import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card/Card';
import { groupOptions } from './groupOptions';

import style from './Group.module.css';

export default function Group() {
  const navigate = useNavigate();

  const handleNavigate = (i: number) => {
    navigate(groupOptions[i].url, { replace: true });
  };

  return (
    <div className={style.container}>
      {groupOptions.map((option, i) => (
        <Card
          key={option.title}
          className={style.card}
        >
          <div
            className={style.option}
            onClick={() => handleNavigate(i)}
            role="button"
            tabIndex={i}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleNavigate(i);
              }
            }}
          >
            <h3 className={style.title}>{option.title}</h3>
            <p className={style.description}>{option.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
