import React from 'react';

import { Topic } from 'types/Topic/Topic';

import style from './Module.module.css';

type Props = {
  module_title: string;
  topics: Topic[];
};

export default function Module({ module_title, topics }: Props) {
  console.log(topics);
  return (
    <div className={style.container}>
      <h2 className={style.title}>{module_title}</h2>
    </div>
  );
}
