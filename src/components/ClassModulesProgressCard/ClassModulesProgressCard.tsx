import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from 'components/Card/Card';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Carousel from 'components/Carousel/Carousel';

import { ModuleList, getDummyData } from './dummyData';
import styles from './ClassModulesProgressCard.module.css';

type Props = {
  className?: string;
};

export default function ClassModulesProgressCard({ className }: Props) {
  const [moduleList, setModuleList] = useState<ModuleList>([]);

  const moduleNodes = moduleList.map((module, index) => (
    <div
      key={module.id}
      className={styles['progress-bar-container']}
    >
      <div className={styles['progress-bar']}>
        <CircularProgressbarWithChildren value={module.percentage}>
          <div className={styles['progress-bar-content']}>
            <span className={styles.percentage}>{module.percentage}%</span>
            <span className={styles.students}>{`${module.students}/32`}</span>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <span className={styles['module-name']}>{`Módulo ${index + 1}: ${
        module.name
      }`}</span>
    </div>
  ));

  useEffect(() => {
    const getModules = async () => {
      const modules = await getDummyData();

      setModuleList(modules);
    };

    getModules();
  }, []);

  return (
    <Card className={`${className} ${styles.container}`}>
      <div className={styles['header-container']}>
        <h2>Avance de Módulos</h2>
        <Link to="modules">Ver Grupo</Link>
      </div>
      <Carousel
        items={moduleNodes}
        className={styles.carousel}
      />
    </Card>
  );
}
ClassModulesProgressCard.defaultProps = {
  className: '',
};
