import React from 'react';

import TopicCard from 'components/TopicCard/TopicCard';

import { Topic } from 'types/Topic/Topic';

import style from './ModuleTopics.module.css';

type Props = {
  module_title: string;
  topics: Topic[];
};

export default function ModuleTopics({ module_title, topics }: Props) {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{module_title}</h2>
      {topics.map((topic) => (
        <TopicCard
          key={topic.topic_id}
          data={topic}
        />
      ))}
    </div>
  );
}
