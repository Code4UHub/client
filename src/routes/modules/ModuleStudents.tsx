import React from 'react';

import ModuleCard from 'components/ModuleCard/ModuleCard';

import { data } from './moduledummy';

import style from './ModuleStudents.module.css';

export default function ModuleStudents() {
  return (
    <div className={style.container}>
      {data.map((topic) => (
        <ModuleCard
          key={topic.topic_id}
          data={topic}
        />
      ))}
    </div>
  );
}
