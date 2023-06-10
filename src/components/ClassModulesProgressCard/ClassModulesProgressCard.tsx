import React, { useState, useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getModuleProgress } from 'utils/db/db.utils';

import Card from 'components/Card/Card';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Carousel from 'components/Carousel/Carousel';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import { ModuleProgressList } from 'types/Module/Module';

import styles from './ClassModulesProgressCard.module.css';

type Props = {
  className?: string;
};

export default function ClassModulesProgressCard({ className }: Props) {
  const [moduleList, setModuleList] = useState<ModuleProgressList>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user.currentUser);
  const params = useParams();

  const moduleNodes = moduleList.map((module, index) => (
    <div
      key={module.id}
      className={styles['progress-bar-container']}
    >
      <div className={styles['progress-bar']}>
        <CircularProgressbarWithChildren value={module.percentage}>
          <div className={styles['progress-bar-content']}>
            <span className={styles.percentage}>{module.percentage}%</span>
            <span
              className={styles.students}
            >{`${module.number_approved_students}/${module.number_of_students}`}</span>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <span className={styles['module-name']}>{`Módulo ${index + 1}: ${
        module.title
      }`}</span>
    </div>
  ));

  useEffect(() => {
    const getModules = async () => {
      setIsLoading(true);
      const modules = await getModuleProgress(
        user?.authToken as string,
        params?.id as string
      );

      if (modules.status === 'success' && typeof modules.data !== 'string') {
        setModuleList(modules.data);
      }

      setIsLoading(false);
    };

    getModules();
  }, []);

  return (
    <Card className={`${className} ${styles.container}`}>
      <div className={styles['header-container']}>
        <h2>Avance de Módulos</h2>
        <Link to="modules">Ver Grupo</Link>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Carousel
          items={moduleNodes}
          className={styles.carousel}
        />
      )}
    </Card>
  );
}
ClassModulesProgressCard.defaultProps = {
  className: '',
};
