import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'components/Card/Card';

import { groupOptions } from './groupOptions';

import style from './Group.module.css';

export default function Group() {
  return (
    <div className={style.container}>
      {groupOptions.map((option, i) => (
        <Link
          to={`${i}`}
          state={{ id_graph: i }}
          key={option.title}
        >
          <Card className={style.card}>
            <h3 className={style.title}>{option.title}</h3>
            <p className={style.description}>{option.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
